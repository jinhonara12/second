require("dotenv").config()
const { Client } = require("@notionhq/client")
const fs = require("fs")
const clubFetch = require("./app/lib/static_database/club")
const teamFetch = require("./app/lib/static_database/team")
const { queryAllDatabasePages } = require("./app/lib/database/notionHelper")

const KDate = function (utcDateString) {
    const date = new Date(utcDateString)
    const kstOffset = 9 * 60 * 60 * 1000 // 9 hours in milliseconds
    const kstDate = new Date(date.getTime() + kstOffset)
    return kstDate
}

const notion = new Client({ auth: process.env.NOTION_API_KEY })

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Notion API 429 Rate Limited 에러 감지 시 지수 백오프 및 Retry-After 대기 후 자동 재시도
 */
async function notionWithRetry(apiFn, retries = 5) {
    for (let i = 0; i < retries; i++) {
        try {
            await sleep(250) // 요청 간 250ms 딜레이 (초당 ~4회 이하로 제한)
            return await apiFn()
        } catch (error) {
            const isRateLimit = error?.status === 429 || error?.code === "rate_limited"
            if (isRateLimit && i < retries - 1) {
                const retryAfterHeader = error?.headers?.get?.("retry-after") || error?.headers?.["retry-after"]
                const retryAfterSec = parseInt(retryAfterHeader, 10)
                const waitMs = (!isNaN(retryAfterSec) && retryAfterSec > 0)
                    ? (retryAfterSec + 1) * 1000
                    : Math.pow(2, i) * 2000
                console.warn(`[Notion Rate Limit] 429 발생! ${Math.round(waitMs / 1000)}초 후 재시도 (${i + 1}/${retries})...`)
                await sleep(waitMs)
            } else {
                throw error
            }
        }
    }
}

/**
 * 관계형(relation) 페이지 정보 중복 조회 방지를 위한 In-memory 캐시
 */
const pageCache = new Map()

async function getCachedPage(pageId) {
    if (pageCache.has(pageId)) {
        return pageCache.get(pageId)
    }
    const promise = notionWithRetry(() => notion.pages.retrieve({ page_id: pageId }))
    pageCache.set(pageId, promise)
    return promise
}

async function queryDatabase(params) {
    return notionWithRetry(() => notion.databases.query(params))
}

function writeJson(data, fileName) {
    const basePath = "./app/lib/static_database"
    fs.writeFileSync(`${basePath}/${fileName}.json`, JSON.stringify(data))
}

async function barData() {
    const databaseId = process.env.NOTION_BAR
    try {
        const results = await queryAllDatabasePages(notion, {
            database_id: databaseId,
            sorts: [
                {
                    property: "name",
                    direction: "ascending",
                },
            ],
        }, notionWithRetry)

        const data = []
        for (const page of results) {
            const clubArray = []
            for (const clubList of page.properties.club.relation) {
                const id = clubList.id
                const response = await getCachedPage(id)
                const result = response.properties.name.title[0].text.content
                clubArray.push(result)
            }

            data.push({
                page_id: page.id,
                name: page.properties.name.title[0].text.content,
                location: page.properties.location.select.name,
                socialArray: page.properties.social.multi_select,
                address: page.properties.address.rich_text[0].plain_text,
                url: page.properties.url.url,
                club: clubArray,
                heart: page.properties.member_heart_count.formula.number,
            })
        }
        writeJson(data, "bar")
        return data
    } catch (error) {
        console.error("Error fetching data from Notion:", error)
        throw error
    }
}

async function clubData() {
    const databaseId = process.env.NOTION_CLUB
    try {
        const results = await queryAllDatabasePages(notion, {
            database_id: databaseId,
            sorts: [
                {
                    property: "name",
                    direction: "ascending",
                },
            ],
        }, notionWithRetry)

        const data = []
        for (const page of results) {
            const barArray = []
            for (const barList of page.properties.bar.relation) {
                const id = barList.id
                const response = await getCachedPage(id)
                const result = response.properties.name.title[0].text.content
                barArray.push(result)
            }

            data.push({
                page_id: page.id,
                name: page.properties.name.title[0].text.content,
                facebook: page.properties.facebook.url,
                instagram: page.properties.instagram.url,
                linktree: page.properties.linktree.url,
                cafe: page.properties.cafe.url,
                youtube1: page.properties.youtube1.url,
                youtube2: page.properties.youtube2.url,
                mainday: page.properties.mainday.multi_select,
                homepage: page.properties.homepage.url,
                location: page.properties.location.rollup.array[0]
                    ? page.properties.location.rollup.array[0].select.name
                    : "",
                address: page.properties.address.rollup.array[0]
                    ? page.properties.address.rollup.array[0].rich_text[0].plain_text
                    : "",
                heart: page.properties.member_heart_count.formula.number,
                bar: barArray,
            })
        }
        writeJson(data, "club")
        return data
    } catch (error) {
        console.error("Error fetching data from Notion:", error)
        throw error
    }
}

async function teamData() {
    const databaseId = process.env.NOTION_TEAM
    try {
        const response = await queryDatabase({
            database_id: databaseId,
            sorts: [
                {
                    property: "name",
                    direction: "ascending",
                },
            ],
        })

        const data = []
        for (const page of response.results) {
            const recruitmentArray = []
            for (const item of page.properties.team_recruitment.relation) {
                const res = await getCachedPage(item.id)
                recruitmentArray.push({
                    name: res.properties.name.title[0].text.content,
                    url: res.properties.url.url,
                    dday: res.properties.dday.formula.string,
                    start_date: res.properties.date.date.start,
                })
            }

            data.push({
                page_id: page.id,
                name: page.properties.name.title[0].text.content,
                dayArray: page.properties.day.multi_select,
                teacherArray: page.properties.teacher.multi_select,
                instagram: page.properties.instagram.url,
                linktree: page.properties.linktree.url,
                memberArray: page.properties.team_member.relation,
                recruitmentArray: recruitmentArray,
            })
        }
        writeJson(data, "team")
        return data
    } catch (error) {
        console.error("Error fetching data from Notion:", error)
        throw error
    }
}

async function eventData() {
    const databaseId = process.env.NOTION_EVENT_RECURITMENT

    try {
        const response = await queryDatabase({
            database_id: databaseId,
            sorts: [
                {
                    property: "date",
                    direction: "ascending",
                },
            ],
        })
        const data = response.results.map((page) => {
            return {
                page_id: page.id,
                year: page.properties.year.formula.number,
                name: page.properties.name.title[0].text.content,
                start_date: page.properties.date.date.start,
                end_date: page.properties.date.date.end,
                awards: page.properties.awards.relation,
                photo:
                    page.properties.photo.files[0] &&
                    `${process.env.NOTION_SITE}/image/${encodeURIComponent(
                        page.properties.photo.files[0].file.url
                    )}?cache=v2&table=block&id=${page.id}`,
                created_time: KDate(page.properties.created_time.created_time).toISOString(),
                last_modified_time: KDate(page.properties.last_modified_time.last_edited_time).toISOString(),
            }
        })
        writeJson(data, "event")
        return data
    } catch (error) {
        console.error("event-recuritment data error")
        throw error
    }
}

async function recruitmentClassData() {
    const databaseId = process.env.NOTION_CLASS_RECURITMENT

    try {
        const response = await queryDatabase({
            database_id: databaseId,
            filter: {
                property: "dday",
                rich_text: {
                    contains: "종료",
                },
            },
            sorts: [
                {
                    property: "date",
                    direction: "descending",
                },
            ],
        })

        const data = response.results.map((page) => {
            const clubId = page.properties.club.relation[0].id
            const club = clubFetch.find((club) => club.page_id == clubId)
            const clubName = club ? club.name : ""
            const barArray = club ? club.bar : []

            return {
                classification: page.properties.classification.select.name,
                name: page.properties.name.title[0].text.content,
                url: page.properties.url.url,
                check_url: page.properties.check_url.url,
                start_date: page.properties.date.date.start,
                end_date: page.properties.date.date.end,
                dday: page.properties.dday.formula.string,
                club: clubName,
                bar: barArray,
                created_time: KDate(page.properties.created_time.created_time).toISOString(),
                last_modified_time: KDate(page.properties.last_modified_time.last_edited_time).toISOString(),
            }
        })
        writeJson(data, "classRecruitment")
        return data
    } catch (error) {
        console.error("class-recuritment data error")
        throw error
    }
}

async function recruitmentTeamData() {
    const databaseId = process.env.NOTION_TEAM_RECURITMENT

    try {
        const response = await queryDatabase({
            database_id: databaseId,
            filter: {
                property: "dday",
                rich_text: {
                    contains: "종료",
                },
            },
            sorts: [
                {
                    property: "date",
                    direction: "descending",
                },
            ],
        })

        const data = response.results.map((page) => {
            const teamId = page.properties.team.relation[0] ? page.properties.team.relation[0].id : null
            const team = teamFetch.find((team) => team.page_id === teamId)
            const teamName = team ? team.name : "TEAM"

            return {
                classification: page.properties.classification.select.name,
                name: page.properties.name.title[0].text.content,
                team: teamName,
                url: page.properties.url.url,
                start_date: page.properties.date.date.start,
                end_date: page.properties.date.date.end,
                dday: page.properties.dday.formula.string,
                created_time: KDate(page.properties.created_time.created_time).toISOString(),
                last_modified_time: KDate(page.properties.last_modified_time.last_edited_time).toISOString(),
            }
        })

        writeJson(data, "teamRecruitment")
        return data
    } catch (error) {
        console.error("team-recuritment data error")
        throw error
    }
}

async function recruitmentWorkShopData() {
    const databaseId = process.env.NOTION_WORKSHOP_RECURITMENT

    try {
        const response = await queryDatabase({
            database_id: databaseId,
            filter: {
                property: "dday",
                rich_text: {
                    contains: "종료",
                },
            },
            sorts: [
                {
                    property: "date",
                    direction: "descending",
                },
            ],
        })
        const data = response.results.map((page) => {
            return {
                classification: page.properties.classification.select.name,
                name: page.properties.name.title[0].text.content,
                url: page.properties.url.url,
                check_url: page.properties.check_url.url,
                start_date: page.properties.date.date.start,
                end_date: page.properties.date.date.end,
                dday: page.properties.dday.formula.string,
                photo:
                    page.properties.photo.files[0] &&
                    `${process.env.NOTION_SITE}/image/${encodeURIComponent(
                        page.properties.photo.files[0].file.url
                    )}?cache=v2&table=block&id=${page.id}`,
                created_time: KDate(page.properties.created_time.created_time).toISOString(),
                last_modified_time: KDate(page.properties.last_modified_time.last_edited_time).toISOString(),
            }
        })

        writeJson(data, "workShopRecruitment")
        return data
    } catch (error) {
        console.error("workshop-recuritment data error")
        throw error
    }
}

async function eventAwardsData() {
    const databaseId = process.env.NOTION_EVENT_RECURITMENT

    try {
        const response = await queryDatabase({
            database_id: databaseId,
            sorts: [
                {
                    property: "date",
                    direction: "descending",
                },
            ],
        })
        const data = response.results.map((page) => {
            return {
                page_id: page.id,
                year: page.properties.year.formula.number,
                name: page.properties.name.title[0].text.content,
                start_date: page.properties.date.date.start,
                month: page.properties.date.date.start.split("-")[1],
                end_date: page.properties.date.date.end,
                awards: page.properties.awards.relation,
            }
        })
        writeJson(data, "eventForAwards")
        return data
    } catch (error) {
        console.error("event-for-awards data error")
        throw error
    }
}

async function recruitmentEventData() {
    const databaseId = process.env.NOTION_EVENT_RECURITMENT

    try {
        const response = await queryDatabase({
            database_id: databaseId,
            filter: {
                property: "dday",
                rich_text: {
                    contains: "종료",
                },
            },
            sorts: [
                {
                    property: "date",
                    direction: "descending",
                },
            ],
        })
        const data = response.results.map((page) => {
            return {
                page_id: page.id,
                classification: page.properties.classification.select.name,
                year: page.properties.year.formula.number,
                name: page.properties.name.title[0].text.content,
                url: page.properties.url.url,
                home: page.properties.home.url,
                check_url: page.properties.check_url.url,
                start_date: page.properties.date.date.start,
                end_date: page.properties.date.date.end,
                dday: page.properties.dday.formula.string,
                member_heart_count: page.properties.member_heart_count.formula.number,
                awards: page.properties.awards.relation,
                member_heart: page.properties.member_heart.relation,
                photo:
                    page.properties.photo.files[0] &&
                    `${process.env.NOTION_SITE}/image/${encodeURIComponent(
                        page.properties.photo.files[0].file.url
                    )}?cache=v2&table=block&id=${page.id}`,
                created_time: KDate(page.properties.created_time.created_time).toISOString(),
                last_modified_time: KDate(page.properties.last_modified_time.last_edited_time).toISOString(),
            }
        })
        writeJson(data, "eventRecruitment")
        return data
    } catch (error) {
        console.error("event-recuritment data error")
        throw error
    }
}

async function recruitmentFestivalData() {
    const databaseId = process.env.NOTION_FESTIVAL_RECURITMENT

    try {
        const response = await queryDatabase({
            database_id: databaseId,
            filter: {
                property: "dday",
                rich_text: {
                    contains: "종료",
                },
            },
            sorts: [
                {
                    property: "date",
                    direction: "descending",
                },
            ],
        })
        const data = response.results.map((page) => {
            return {
                page_id: page.id,
                classification: page.properties.classification.select.name,
                year: page.properties.year.formula.number,
                name: page.properties.name.title[0].text.content,
                url: page.properties.url.url,
                home: page.properties.home.url,
                check_url: page.properties.check_url.url,
                start_date: page.properties.date.date.start,
                end_date: page.properties.date.date.end,
                dday: page.properties.dday.formula.string,
                member_heart_count: page.properties.member_heart_count.formula.number,
                member_heart: page.properties.member_heart.relation,
                photo:
                    page.properties.photo.files[0] &&
                    `${process.env.NOTION_SITE}/image/${encodeURIComponent(
                        page.properties.photo.files[0].file.url
                    )}?cache=v2&table=block&id=${page.id}`,
                created_time: KDate(page.properties.created_time.created_time).toISOString(),
                last_modified_time: KDate(page.properties.last_modified_time.last_edited_time).toISOString(),
            }
        })
        writeJson(data, "festivalRecruitment")
        return data
    } catch (error) {
        console.error("festival-recuritment data error")
        throw error
    }
}

async function fetchData() {
    await barData()
    await clubData()
    await teamData()
    await eventData()
    await recruitmentClassData()
    await recruitmentTeamData()
    await recruitmentWorkShopData()
    await recruitmentEventData()
    await recruitmentFestivalData()
    await eventAwardsData()
}

fetchData()

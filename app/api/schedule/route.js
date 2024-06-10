require('dotenv').config();
const { Client } = require('@notionhq/client');
const fs = require('fs');
const clubFetch = require('../../lib/static_database/club');
const teamFetch = require('../../lib/static_database/team');

const KDate = function (utcDateString) {
    const date = new Date(utcDateString);
    const kstOffset = 9 * 60 * 60 * 1000; // 9 hours in milliseconds
    const kstDate = new Date(date.getTime() + kstOffset);
    return kstDate;
}

const notion = new Client({ auth: process.env.NOTION_API_KEY });

function writeJson(data, fileName) {
    const basePath = "./app/lib/static_database";
    fs.writeFileSync(`${basePath}/${fileName}.json`, JSON.stringify(data));
}

async function fetchData() {
    await barFetch();
    await clubData();
    await teamData();
    await eventData();
    await recruitmentClassData();
    await recruitmentTeamData();
    await recruitmentWorkShopData();
    await recruitmentEventData();
    await recruitmentFestivalData();
}

async function barFetch() {
    const databaseId = process.env.NOTION_BAR;
    try {
        const response = await notion.databases.query({
            database_id: databaseId
        });
        const data = await Promise.all(response.results.map(async page => {
            const clubPromise = page.properties.club.relation.map(async clubList => {
                const id = clubList.id;

                const response = await notion.pages.retrieve({
                    page_id: id
                })
                const result = response.properties.name.title[0].text.content

                return result;
            })

            const clubArray = await Promise.all(clubPromise);
            return {
                page_id: page.id,
                name: page.properties.name.title[0].text.content,
                locaiton: page.properties.location.select.name,
                socialArray: page.properties.social.multi_select,
                address: page.properties.address.rich_text[0].plain_text,
                url: page.properties.url.url,
                club: clubArray,
                heart: page.properties.member_heart_count.formula.number,
            }
        }))
        writeJson(data, "bar")
        return data;
    } catch (error) {
        console.error('Error fetching data from Notion:', error);
        throw error;
    }
}

async function clubData() {
    const databaseId = process.env.NOTION_CLUB;
    try {
        const response = await notion.databases.query({
            database_id: databaseId
        });
        const data = await Promise.all(response.results.map(async page => {
            const barPromise = page.properties.bar.relation.map(async barList => {
                const id = barList.id;

                const response = await notion.pages.retrieve({
                    page_id: id
                })
                const result = response.properties.name.title[0].text.content

                return result;
            })

            const barArray = await Promise.all(barPromise)

            return {
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
                locaiton: page.properties.location.rollup.array[0].select.name,
                address: page.properties.address.rollup.array[0].rich_text[0].plain_text,
                heart: page.properties.member_heart_count.formula.number,
                bar: barArray,
            }
        }))
        writeJson(data, "club")
        return data;
    } catch (error) {
        console.error('Error fetching data from Notion:', error);
        throw error;
    }
}

async function teamData() {
    const databaseId = process.env.NOTION_TEAM;
    try {
        const response = await notion.databases.query({
            database_id: databaseId
        });
        const data = await Promise.all(response.results.map(async page => {
            const recruitPromise = await Promise.all(page.properties.team_recruitment.relation.map(async data => {
                const response = await notion.pages.retrieve({
                    page_id: data.id
                })
                return {
                    name: response.properties.name.title[0].text.content,
                    url: response.properties.url.url,
                    dday: response.properties.dday.formula.string,
                    start_date: response.properties.date.date.start
                }
            }))
            return {
                page_id: page.id,
                name: page.properties.name.title[0].text.content,
                dayArray: page.properties.day.multi_select,
                teacherArray: page.properties.teacher.multi_select,
                instagram: page.properties.instagram.url,
                linktree: page.properties.linktree.url,
                memberArray: page.properties.team_member.relation,
                recruitmentArray: recruitPromise
            }
        }))
        writeJson(data, "team")
        return data;
    } catch (error) {
        console.error('Error fetching data from Notion:', error);
        throw error;
    }
}

async function eventData() {
    const databaseId = process.env.NOTION_EVENT_RECURITMENT;

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            sorts: [
                {
                    property: "date",
                    direction: "ascending"
                }
            ],
        })
        const data = response.results.map(page => {

            return {
                page_id: page.id,
                year: page.properties.year.formula.number,
                name: page.properties.name.title[0].text.content,
                start_date: page.properties.date.date.start,
                end_date: page.properties.date.date.end,
                awards: page.properties.awards.relation,
                photo: page.properties.photo.files[0] && page.properties.photo.files[0].file.url,
                // classification: page.properties.classification.select.name,
                // url: page.properties.url.url,
                // home: page.properties.home.url,
                // check_url: page.properties.check_url.url,
                // dday: page.properties.dday.formula.string,
                // member_heart_count: page.properties.member_heart_count.formula.number,
                // member_heart: page.properties.member_heart.relation,
            }
        })
        writeJson(data, "event")
        return data;
    } catch (error) {
        console.error("event-recuritment data error");
        throw error;
    }

}

async function recruitmentClassData() {
    const databaseId = process.env.NOTION_CLASS_RECURITMENT;

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "dday",
                rich_text: {
                    "contains": "종료"
                }
            },
            sorts: [
                {
                    property: "date",
                    direction: "descending"
                }
            ],
        })

        const data = response.results.map(page => {
            const clubId = page.properties.club.relation[0].id;
            const club = clubFetch.find(club => club.page_id == clubId);
            const clubName = club ? club.name : "";
            const barArray = club ? club.bar : [];


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
        return data;
    } catch (error) {
        console.error("class-recuritment data error");
        throw error;
    }
}

async function recruitmentTeamData() {
    const databaseId = process.env.NOTION_TEAM_RECURITMENT;

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "dday",
                rich_text: {
                    "contains": "종료"
                }
            },
            sorts: [
                {
                    property: "date",
                    direction: "descending"
                }
            ],
        })

        const data = response.results.map(page => {
            const teamId = page.properties.team.relation[0] ? page.properties.team.relation[0].id : null
            const team = teamFetch.find(team => team.page_id === teamId)
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
        return data;
    } catch (error) {
        console.error("team-recuritment data error");
        throw error;
    }

}

async function recruitmentWorkShopData() {
    const databaseId = process.env.NOTION_WORKSHOP_RECURITMENT;

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "dday",
                rich_text: {
                    "contains": "종료"
                }
            },
            sorts: [
                {
                    property: "date",
                    direction: "descending"
                }
            ],
        })
        const data = response.results.map(page => {

            return {
                classification: page.properties.classification.select.name,
                name: page.properties.name.title[0].text.content,
                url: page.properties.url.url,
                check_url: page.properties.check_url.url,
                start_date: page.properties.date.date.start,
                end_date: page.properties.date.date.end,
                dday: page.properties.dday.formula.string,
                photo: page.properties.photo.files[0] && page.properties.photo.files[0].file.url,
                created_time: KDate(page.properties.created_time.created_time).toISOString(),
                last_modified_time: KDate(page.properties.last_modified_time.last_edited_time).toISOString(),
            }
        })

        writeJson(data, "workShopRecruitment")
        return data;
    } catch (error) {
        console.error("workshop-recuritment data error");
        throw error;
    }
}

async function recruitmentEventData() {
    const databaseId = process.env.NOTION_EVENT_RECURITMENT;

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "dday",
                rich_text: {
                    "contains": "종료"
                }
            },
            sorts: [
                {
                    property: "date",
                    direction: "descending"
                }
            ],
        })
        const data = response.results.map(page => {
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
                photo: page.properties.photo.files[0] && page.properties.photo.files[0].file.url,
                created_time: KDate(page.properties.created_time.created_time).toISOString(),
                last_modified_time: KDate(page.properties.last_modified_time.last_edited_time).toISOString(),
            }
        })
        writeJson(data, "eventRecruitment");
        return data;
    } catch (error) {
        console.error("event-recuritment data error");
        throw error;
    }

}

async function recruitmentFestivalData() {
    const databaseId = process.env.NOTION_FESTIVAL_RECURITMENT;

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "dday",
                rich_text: {
                    "contains": "종료"
                }
            },
            sorts: [
                {
                    property: "date",
                    direction: "descending"
                }
            ],
        })
        const data = response.results.map(page => {

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
                photo: page.properties.photo.files[0] && page.properties.photo.files[0].file.url,
                created_time: KDate(page.properties.created_time.created_time).toISOString(),
                last_modified_time: KDate(page.properties.last_modified_time.last_edited_time).toISOString(),
            }
        })
        writeJson(data, "festivalRecruitment");
        return data;
    } catch (error) {
        console.error("festival-recuritment data error");
        throw error;
    }

}

console.log('schedule 실행')

export async function GET(request) {
    try {
        await fetchData();
        // res.status(200).json({ message: 'Data fetched and written successfully' });
        return Response.json(true)
    } catch (error) {
        // console.error('Error fetching data:', error);
        // res.status(500).json({ message: 'Error fetching data', error });
    }
}


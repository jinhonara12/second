import { Client } from "@notionhq/client"
const notion = new Client({ auth: process.env.NOTION_API_KEY })

//기존 데이터
// export default async function fetchData() {
//     const databaseId = process.env.NOTION_TEAM
//     try {
//         const response = await notion.databases.query({
//             database_id: databaseId,
//         })
//         const data = await Promise.all(
//             response.results.map(async (page) => {
//                 const recruitPromise = await Promise.all(
//                     page.properties.team_recruitment.relation.map(async (data) => {
//                         const response = await notion.pages.retrieve({
//                             page_id: data.id,
//                         })
//                         return {
//                             name: response.properties.name.title[0].text.content,
//                             url: response.properties.url.url,
//                             dday: response.properties.dday.formula.string,
//                             start_date: response.properties.date.date.start,
//                         }
//                     })
//                 )

//                 return {
//                     page_id: page.id,
//                     name: page.properties.name.title[0].text.content,
//                     dayArray: page.properties.day.multi_select,
//                     teacherArray: page.properties.teacher.multi_select,
//                     instagram: page.properties.instagram.url,
//                     memberArray: page.properties.team_member.relation,
//                     recruitmentArray: recruitPromise,
//                 }
//             })
//         )
//         return data
//     } catch (error) {
//         console.error("Error fetching data from Notion:", error)
//         throw error
//     }
// }

// 팀 모집관련 내용만 불러오기
// team-recuritment.js 활용, 팀 데이터를 가져오는 것은 static상태로 가져옴
// 정적인 팀 정보에 동적으로 모집관련된 부분만 업데이트

export default async function fetchData() {
    const databaseId = process.env.NOTION_TEAM_RECURITMENT

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "dday",
                rich_text: {
                    does_not_contain: "종료",
                },
            },
            sorts: [
                {
                    property: "date",
                    direction: "ascending",
                },
            ],
        })

        const data = response.results.map((page) => {
            const recruitmentObject = {
                teamId: page.properties.team.relation[0] ? page.properties.team.relation[0].id : null,
                name: page.properties.name.title[0].plain_text,
                url: page.properties.url.url,
                dday: page.properties.dday.formula.string,
                start_date: page.properties.date.date.start,
            }
            return recruitmentObject
        })
        return data
    } catch (error) {
        console.error("team-recuritment data error")
        throw error
    }
}

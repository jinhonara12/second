import { Client } from "@notionhq/client"
import teamData from "../static_database/team"
import KDate from "../../(component)/KoreaTime"
const notion = new Client({ auth: process.env.NOTION_API_KEY })

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
            const teamId = page.properties.team.relation[0] ? page.properties.team.relation[0].id : null
            const team = teamData.find((team) => team.page_id === teamId)
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

        // const data = await Promise.all(response.results.map(async page => {
        //     // const last_edited_id = page.properties.last_modifier.last_edited_by.id;
        //     // const last_user = await notion.users.retrieve({ user_id: last_edited_id });

        //     // const creator_id = page.properties.creator.created_by.id;
        //     // const create_user = await notion.users.retrieve({ user_id: creator_id });

        //     const teamResponse = page.properties.team.relation[0] && await notion.pages.retrieve({
        //         page_id: page.properties.team.relation[0].id
        //     })

        //     return {
        //         classification: page.properties.classification.select.name,
        //         name: page.properties.name.title[0].text.content,
        //         team: (teamResponse && teamResponse.properties.name.title[0].text.content) || "TEAM",
        //         url: page.properties.url.url,
        //         start_date: page.properties.date.date.start,
        //         end_date: page.properties.date.date.end,
        //         dday: page.properties.dday.formula.string,
        //         // creator_user: create_user.name,
        //         created_time: page.properties.created_time.created_time,
        //         // last_modifier_user: last_user.name,
        //         last_modified_time: page.properties.last_modified_time.last_edited_time,
        //     }
        // }))
        return data
    } catch (error) {
        console.error("team-recuritment data error")
        throw error
    }
}

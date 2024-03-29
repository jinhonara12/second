import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function fetchData() {
    const databaseId = process.env.NOTION_TEAM_RECURITMENT;

    try {
        const response = await notion.databases.query({
            database_id: databaseId
        })
        const data = await Promise.all(response.results.map(async page => {
            const userId = page.properties.last_modifier.last_edited_by.id;
            const userResponse = await notion.users.retrieve({ user_id: userId });
            return {
                name: page.properties.name.title[0].text.content,
                teacher: page.properties.teacher.rollup,
                team: page.properties.team.relation,
                url: page.properties.url.url,
                start_date: page.properties.date.date.start,
                end_date: page.properties.date.date.end,
                dday: page.properties.dday.formula.string,
                creator: page.properties.creator.created_by.id,
                created_time: page.properties.created_time.created_time,
                last_modifier_user: userResponse.name,
                last_modified_time: page.properties.last_modified_time.last_edited_time,
            }
        }))

        return data;
    } catch (error) {
        console.error("class-recuritment data error");
        throw error;
    }

}
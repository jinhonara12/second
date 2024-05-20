import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY });

export default async function fetchData() {
    const databaseId = process.env.NEXT_PUBLIC_NOTION_CLASS_RECURITMENT;

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            sorts: [
                {
                    property: "date",
                    direction: "descending"
                }
            ],
        })
        const data = await Promise.all(response.results.map(async page => {

            const last_edited_id = page.properties.last_modifier.last_edited_by.id;
            const last_user = await notion.users.retrieve({ user_id: last_edited_id });

            const creator_id = page.properties.creator.created_by.id;
            const create_user = await notion.users.retrieve({ user_id: creator_id });

            const clubResponse = await notion.pages.retrieve({
                page_id: page.properties.club.relation[0].id
            })

            const barResponse = await Promise.all(clubResponse.properties.bar.relation.map(async bar => {
                const barArray = await notion.pages.retrieve({
                    page_id: bar.id
                })

                return barArray.properties.name.title[0].text.content
            }))

            return {
                classification: page.properties.classification.select.name,
                name: page.properties.name.title[0].text.content,
                url: page.properties.url.url,
                check_url: page.properties.check_url.url,
                start_date: page.properties.date.date.start,
                end_date: page.properties.date.date.end,
                dday: page.properties.dday.formula.string,
                club: clubResponse.properties.name.title[0].text.content,
                bar: barResponse,
                creator_user: create_user.name,
                created_time: page.properties.created_time.created_time,
                last_modifier_user: last_user.name,
                last_modified_time: page.properties.last_modified_time.last_edited_time,
            }
        }))
        return data;
    } catch (error) {
        console.error("class-recuritment data error");
        throw error;
    }
}
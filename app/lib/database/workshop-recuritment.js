import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function fetchData() {
    const databaseId = process.env.NOTION_WORKSHOP_RECURITMENT;

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "dday",
                rich_text: {
                    "does_not_contain": "종료"
                }
            },
            sorts: [
                {
                    property: "date",
                    direction: "ascending"
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
                created_time: page.properties.created_time.created_time,
                last_modified_time: page.properties.last_modified_time.last_edited_time,
            }
        })

        // const data = await Promise.all(response.results.map(async page => {
        //     const last_edited_id = page.properties.last_modifier.last_edited_by.id;
        //     const last_user = await notion.users.retrieve({ user_id: last_edited_id });

        //     const creator_id = page.properties.creator.created_by.id;
        //     const create_user = await notion.users.retrieve({ user_id: creator_id });

        //     return {
        //         classification: page.properties.classification.select.name,
        //         name: page.properties.name.title[0].text.content,
        //         url: page.properties.url.url,
        //         check_url: page.properties.check_url.url,
        //         start_date: page.properties.date.date.start,
        //         end_date: page.properties.date.date.end,
        //         dday: page.properties.dday.formula.string,
        //         photo: page.properties.photo.files[0] && page.properties.photo.files[0].file.url,
        //         creator_user: create_user.name,
        //         created_time: page.properties.created_time.created_time,
        //         last_modifier_user: last_user.name,
        //         last_modified_time: page.properties.last_modified_time.last_edited_time,
        //     }
        // }))

        return data;
    } catch (error) {
        console.error("workshop-recuritment data error");
        throw error;
    }
}
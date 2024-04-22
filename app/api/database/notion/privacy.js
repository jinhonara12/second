import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function fetchData(kakao_id) {
    const databaseId = process.env.NOTION_PRIVACY;
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                "property": "kakao_id",
                "rich_text": {
                    "equals": kakao_id
                }
            }
        })

        const properties = response.results[0].properties;

        const dateString = properties.join.created_time
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        const data = {
            page_id: response.results[0].id,
            index: properties.id.unique_id.number,
            name: properties.name.title[0].text.content,
            birthday: properties.birthday.date ? properties.birthday.date.start : formattedDate,
            tel: properties.tel.phone_number ?? "",
            email: properties.email.email ?? "",
            join: formattedDate,
            alarm: properties.alarm.checkbox
        }
        return data
    } catch (error) {
        console.error('privacy error')
        throw error
    }
}
import { Client } from '@notionhq/client'
import KDate from '../../(component)/KoreaTime';
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function fetchData() {
    const databaseId = process.env.NOTION_FESTIVAL_RECURITMENT;

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
                page_id: page.id,
                classification: page.properties.classification.select.name,
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
        return data;
    } catch (error) {
        console.error("festival-recuritment data error");
        throw error;
    }

}
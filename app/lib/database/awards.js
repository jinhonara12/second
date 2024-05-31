import { Client } from '@notionhq/client';
import KoreaTime from '../../(component)/KoreaTime';
const notion = new Client({ auth: process.env.NOTION_API_KEY });


export default async function fetchData() {
    const databaseId = process.env.NOTION_AWARDS;
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            sorts: [
                {
                    property: "created_date",
                    // direction: "ascending"
                    direction: "descending"
                }
            ],
        });

        const data = response.results.map(item => {
            return {
                page_id: item.id,
                user_id: item.properties.member.relation[0].id,
                user: item.properties.name.title[0].text.content,
                event_id: item.properties.event.relation[0].id,
                event_name: item.properties.event_name.rollup.array[0].title[0].text.content,
                year: item.properties.year.rollup.array[0].formula.number,
                start_date: item.properties.date.rollup.date.start,
                end_date: item.properties.date.rollup.date.end,
                level: item.properties.level.select.name,
                division: item.properties.division.select.name,
                result: item.properties.result.select.name,
                valid_date: item.properties.valid_date.formula.boolean
            }
        })
        return data

    } catch (error) {
        console.error('Error fetching data from Notion:', error);
        throw error;
    }
}
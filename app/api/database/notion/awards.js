
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_AWARDS;

export default async function fetchData(kakao_id) {
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            sorts: [
                {
                    property: "date",
                    // direction: "ascending"
                    direction: "descending"
                }
            ],
            filter: {
                "property": "kakao_id",
                rollup: {
                    any: {
                        "rich_text": {
                            contains: kakao_id
                        }
                    }
                }
            }
        })

        return response.results.map(award => {
            const data = {
                page_id: award.id,
                name: award.properties.event_name.rollup.array[0].title[0].text.content,
                year: award.properties.year.rollup.array[0].formula.number,
                start_date: award.properties.date.rollup.date.start,
                end_date: award.properties.date.rollup.date.end,
                division: award.properties.division.select.name,
                level: award.properties.level.select.name,
                result: award.properties.result.select.name
            }

            return data
        })


    } catch (error) {
        console.error('member error')
        throw error
    }
}
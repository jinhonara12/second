import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(req) {

    return Response.json(true)
}

export async function POST(req) {
    const text = await req.json()
    const databaseId = process.env.NOTION_AWARDS;
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            // sorts: [
            //     {
            //         property: "created_date",
            //         direction: "descending"
            //     }
            // ],
            filter: {
                "property": "name",
                title: {
                    contains: text
                }
            }
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
        return Response.json(data)

    } catch (error) {
        console.log('handler error');
        console.log(error)
        return Response.json(false)
    }
}
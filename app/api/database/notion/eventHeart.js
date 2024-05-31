import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_MEMBER;

export default async function fetchData(kakao_id) {
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
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

        if (!response.results || response.results.length === 0) {
            throw new Error('No matching data found');
        }

        function extractTitles(array) {
            return array.map(item => item.title[0].text.content);
        }

        function createIdTitleArray(idArray, titleArray) {
            return idArray.map((item, index) => ({
                id: item.id,
                title: titleArray[index]
            }));
        }

        const responseResults = response.results[0].properties;

        const festNameArray = extractTitles(responseResults.festival_name.rollup.array);
        const festIdArray = responseResults.festival_recruitment.relation;
        const festArray = createIdTitleArray(festIdArray, festNameArray);

        const eventNameArray = extractTitles(responseResults.event_name.rollup.array);
        const eventIdArray = responseResults.event_recruitment.relation;
        const eventArray = createIdTitleArray(eventIdArray, eventNameArray);

        const data = {
            page_id: response.results[0].id,
            eventArray,
            festArray
        };

        return data

    } catch (error) {
        console.error('member error')
        throw error
    }
}
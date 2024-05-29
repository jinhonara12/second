
import { Client } from '@notionhq/client'
import getRelationTitle from "./relationTitle";

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

        const properties = response.results[0].properties;
        const data = {
            page_id: response.results[0].id,
            nickname: properties.nickname.title ? properties.nickname.title[0].text.content : "",
        }

        return data

    } catch (error) {
        console.error('member error')
        throw error
    }
}
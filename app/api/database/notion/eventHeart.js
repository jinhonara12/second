
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

        const data = {

        }

        const extractRelationIds = (property) =>
            property.relation ? property.relation.map(item => item.id) : [];

        const relations = {
            festArray: extractRelationIds(properties.festival_recruitment),
            eventArray: extractRelationIds(properties.event_recruitment),
        };

        for (let array in relations) {
            data[array] = []
            for (let id of relations[array]) {
                const title = await getRelationTitle(id);
                data[array].push({ title: title, 'id': id })
            }
        }

        return data

    } catch (error) {
        console.error('member error')
        throw error
    }
}
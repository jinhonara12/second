
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
            nickname: properties.nickname.title[0].text.content,
            page_id: response.results[0].id,
        }

        const extractRelationIds = (property) =>
            property.relation ? property.relation.map(item => item.id) : [];

        // 이벤트나 행사, dj, 수상은 가져올 내용이 더 많아질 예정으로 좀 더 보완해야함
        const relations = {
            barArray: extractRelationIds(properties.bar),
            clubArray: extractRelationIds(properties.club),
            eventArray: extractRelationIds(properties.event_recruitment),
            festArray: extractRelationIds(properties.festival_recruitment),
            teamMemberArray: extractRelationIds(properties.team_member),
        };

        for (let array in relations) {
            data[array] = []
            for (let id of relations[array]) {
                const title = await getRelationTitle(id);
                data[array].push(title)
            }
        }

        return data

    } catch (error) {
        console.error('privacy error')
        throw error
    }
}
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_MEMBER;
export default async function fetchData(kakao_id) {
    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "kakao_id",
                rollup: {
                    any: {
                        rich_text: {
                            contains: kakao_id
                        }
                    }
                }
            }
        });

        if (!response.results || response.results.length === 0) {
            throw new Error('No matching data found');
        }

        const properties = response.results[0].properties;
        const formattedDate = formatDate(new Date());

        const data = {
            page_id: response.results[0].id,
            nickname: properties.nickname.title ? properties.nickname.title[0].text.content : "",
            swing_date: properties.swing_date.date ? properties.swing_date.date.start : formattedDate,
            swing_years: properties.swing_years.formula.number,
            swing_days: properties.swing_days.formula.number,
            festArray: createIdTitleArray(properties.festival_recruitment.relation, properties.festival_name.rollup.array),
            eventArray: createIdTitleArray(properties.event_recruitment.relation, properties.event_name.rollup.array),
            barArray: createTitleArray(properties.bar_name.rollup.array),
            clubArray: createTitleArray(properties.club_name.rollup.array),
            teamMemberArray: createTitleArray(properties.team_name.rollup.array),
        };
        return data;

    } catch (error) {
        console.error('member error', error);
        throw error;
    }
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function extractTitles(array) {
    return array.map(item => item.title[0].text.content);
}

function createIdTitleArray(idArray, titleArray) {
    const titles = extractTitles(titleArray);
    return idArray.map((item, index) => ({
        id: item.id,
        title: titles[index]
    }));
}

function createTitleArray(titleArray) {
    return extractTitles(titleArray);
}
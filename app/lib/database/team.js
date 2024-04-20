import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function fetchData() {
    const databaseId = process.env.NOTION_TEAM;
    try {
        const response = await notion.databases.query({
            database_id: databaseId
        });
        const data = response.results.map((page) => {
            return {
                page_id: page.id,
                name: page.properties.name.title[0].text.content,
                dayArray: page.properties.day.multi_select,
                instagram: page.properties.instagram.url,
                memberArray: page.properties.team_member.relation,
                recruitmentArray: page.properties.team_recruitment.relation
            }
        })
        return data;
    } catch (error) {
        console.error('Error fetching data from Notion:', error);
        throw error;
    }
}
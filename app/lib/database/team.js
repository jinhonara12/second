import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function fetchData() {
    const databaseId = process.env.NOTION_TEAM;
    try {
        const response = await notion.databases.query({
            database_id: databaseId
        });
        const data = await Promise.all(response.results.map(async page => {
            const recruitPromise = await Promise.all(page.properties.team_recruitment.relation.map(async data => {
                const response = await notion.pages.retrieve({
                    page_id: data.id
                })
                return {
                    name: response.properties.name.title[0].text.content,
                    url: response.properties.url.url,
                    dday: response.properties.dday.formula.string,
                    start_date: response.properties.date.date.start
                }
            }))

            return {
                page_id: page.id,
                name: page.properties.name.title[0].text.content,
                dayArray: page.properties.day.multi_select,
                teacherArray: page.properties.teacher.multi_select,
                instagram: page.properties.instagram.url,
                memberArray: page.properties.team_member.relation,
                recruitmentArray: recruitPromise
            }
        }))
        return data;
    } catch (error) {
        console.error('Error fetching data from Notion:', error);
        throw error;
    }
}
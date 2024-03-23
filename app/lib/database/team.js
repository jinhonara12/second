import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default (async () => {
    const databaseId = process.env.NOTION_TEAM;
    const response = await notion.databases.query({
        database_id: databaseId
    })
    return response
})()
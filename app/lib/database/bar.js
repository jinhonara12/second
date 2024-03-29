import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function fetchData() {
    const databaseId = process.env.NOTION_BAR;
    try {
        const response = await notion.databases.query({
            database_id: databaseId
        })
        const data = response.results.map((page) => {
            return {
                name: page.properties.name.title[0].text.content,
                location: page.properties.location.select.name,
                url: page.properties.url.url,
                address: page.properties.address.rich_text[0].plain_text,
                heart: page.properties.member_heart_count.formula.number
            }
        })
        return response
    } catch (error) {
        console.error('bar error')
        throw error
    }
}
import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function fetchData(id) {
    if (typeof id == "string") {
        const pageId = id;
        try {
            const response = await notion.pages.retrieve({
                page_id: pageId,

            })
            const title = response.properties.name.title[0].text.content
            return title;
        } catch (error) {
            console.error('relationTitle error')
            throw error
        }
    } else {
        return null
    }

}
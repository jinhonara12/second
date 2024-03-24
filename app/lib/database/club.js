import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function fetchData() {
    const databaseId = process.env.NOTION_CLUB;
    try {
        const response = await notion.databases.query({
            database_id: databaseId
        });
        const data = response.results.map((page) => {
            return {
                name: page.properties.name.title[0].text.content,
                facebook: page.properties.facebook.url,
                instagram: page.properties.instagram.url,
                linktree: page.properties.linktree.url,
                cafe: page.properties.cafe.url,
                youtube1: page.properties.youtube1.url,
                youtube2: page.properties.youtube2.url,
                mainday: page.properties.mainday.multi_select,
                homepage: page.properties.homepage.url,
                locaiton: page.properties.location.rollup.array[0].select.name,
                address: page.properties.address.rollup.array[0].rich_text[0].plain_text
            }
        })
        return data;
    } catch (error) {
        console.error('Error fetching data from Notion:', error);
        throw error;
    }
}
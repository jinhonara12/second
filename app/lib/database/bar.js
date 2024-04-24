
import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function fetchData() {
    const databaseId = process.env.NOTION_BAR;
    try {
        const response = await notion.databases.query({
            database_id: databaseId
        });
        const data = await Promise.all(response.results.map(async page => {
            const clubPromise = page.properties.club.relation.map(async clubList => {
                const id = clubList.id;

                const response = await notion.pages.retrieve({
                    page_id: id
                })
                const result = response.properties.name.title[0].text.content

                return result;
            })

            const clubArray = await Promise.all(clubPromise);
            return {
                page_id: page.id,
                name: page.properties.name.title[0].text.content,
                locaiton: page.properties.location.select.name,
                socialArray: page.properties.social.multi_select,
                address: page.properties.address.rich_text[0].plain_text,
                url: page.properties.url.url,
                club: clubArray,
                heart: page.properties.member_heart_count.formula.number,
            }
        }))
        return data;
    } catch (error) {
        console.error('Error fetching data from Notion:', error);
        throw error;
    }
}
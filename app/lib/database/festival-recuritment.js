import { Client } from '@notionhq/client'
import KDate from '../../(component)/KoreaTime';
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function fetchData() {
    const databaseId = process.env.NOTION_FESTIVAL_RECURITMENT;

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: "dday",
                rich_text: {
                    "does_not_contain": "종료"
                }
            },
            sorts: [
                {
                    property: "date",
                    direction: "ascending"
                }
            ],
        })
        const data = response.results.map(page => {
            console.log()
            return {
                page_id: page.id,
                classification: page.properties.classification.select.name,
                year: page.properties.year.formula.number,
                name: page.properties.name.title[0].text.content,
                url: page.properties.url.url,
                home: page.properties.home.url,
                check_url: page.properties.check_url.url,
                start_date: page.properties.date.date.start,
                end_date: page.properties.date.date.end,
                dday: page.properties.dday.formula.string,
                member_heart_count: page.properties.member_heart_count.formula.number,
                member_heart: page.properties.member_heart.relation,
                photo: page.properties.photo.files[0] && `${process.env.NOTION_SITE}/image/${encodeURIComponent(page.properties.photo.files[0].file.url)}?cache=v2&table=block&id=${page.id}`,
                created_time: KDate(page.properties.created_time.created_time).toISOString(),
                last_modified_time: KDate(page.properties.last_modified_time.last_edited_time).toISOString(),
            }
        })
        return data;
    } catch (error) {
        console.error("festival-recuritment data error");
        throw error;
    }

}


// https://prod-files-secure.s3.us-west-2.amazonaws.com/4c8dfa27-59ce-4f93-855c-c41107b371d7/98595b25-1677-4f2c-91b1-72bc9ce31d2e/RK-2024-Poster.webp

// https://0-100.notion.site/image/https://prod-files-secure.s3.us-west-2.amazonaws.com/4c8dfa27-59ce-4f93-855c-c41107b371d7/98595b25-1677-4f2c-91b1-72bc9ce31d2e/RK-2024-Poster.webp?cache=v2&table=block&id=f1e6504a-4191-40b1-aa37-ec43b084c4c4



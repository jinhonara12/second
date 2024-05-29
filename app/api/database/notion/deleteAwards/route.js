import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(req) {

    return Response.json(true)
}

export async function POST(req) {
    const { page_id } = await req.json()

    try {
        const award = await notion.pages.update({
            page_id: page_id,
            archived: true
        })

        return Response.json(true)

    } catch (error) {
        console.log('ahandler error');
        return Response.json(false)
    }
}
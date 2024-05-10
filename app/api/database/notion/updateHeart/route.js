import { Client } from '@notionhq/client'
import { Cabin_Sketch } from 'next/font/google';
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(req) {
    const response = notion.databases.query({
        database_id: '유저 노션 데이터베이스 아이디'
    })

    return Response.json('get')
}

export async function POST(req) {
    const { page_id, user_id, type, page_type } = await req.json()
    const currentFest = (await notion.pages.retrieve({
        page_id: user_id
    })).properties[page_type].relation

    let updatedFest = []

    if (type === false) {
        updatedFest.push(...currentFest, { "id": page_id })
    } else if (type === true) {
        updatedFest.push(...currentFest.filter(i => i.id !== page_id))
    }

    try {
        async function update() {
            console.log(page_type)
            const response = await notion.pages.update({

                page_id: user_id,
                properties: {
                    [page_type]: {
                        "relation": updatedFest
                    }
                },
            });
        }

        await update()
        return Response.json(true)

    } catch (error) {
        console.log('handler error');
        return Response.json(false)
    }
}
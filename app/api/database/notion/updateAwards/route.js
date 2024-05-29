import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(req) {

    return Response.json(true)
}

export async function POST(req) {
    const { user_id, nickname, eventId, division, level, result } = await req.json()
    try {
        const databaseId = process.env.NOTION_AWARDS
        const createAward = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                "name": {
                    "title": [
                        {
                            "text": {
                                "content": nickname
                            }
                        }
                    ]
                },
                'member': {
                    "relation": [
                        {
                            "id": user_id
                        }
                    ]
                },
                'event': {
                    "relation": [
                        {
                            "id": eventId
                        }
                    ]
                },
                'level': {
                    "select": {
                        "name": level
                    }
                },
                'division': {
                    "select": {
                        "name": division
                    }
                },
                'result': {
                    "select": {
                        "name": result
                    }
                }
            }
        })

        return Response.json(true)

    } catch (error) {
        console.log('handler error');
        console.log(error)
        return Response.json(false)
    }
}
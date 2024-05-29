import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(req) {
    return Response.json('get')
}

export async function POST(req) {
    const { nickname, id, swingDay, barArray, clubArray, teamMemberArray } = await req.json()
    try {
        const response = await notion.pages.update({

            page_id: id,
            properties: {
                'nickname': {
                    "id": "title",
                    "type": "title",
                    "title": [
                        {
                            "type": "text",
                            "text": {
                                "content": nickname,
                                "link": null
                            },
                            "plain_text": nickname,
                        }
                    ]
                },
                'swing_date': {
                    "date": {
                        "start": swingDay,
                    }
                },
                'bar': {
                    "relation": barArray
                },
                'club': {
                    "relation": clubArray
                },
                'team_member': {
                    "relation": teamMemberArray
                }
            },
        });

        return Response.json(true)
    } catch (error) {
        console.log('handler error');
        return Response.json('실패')
    }
}
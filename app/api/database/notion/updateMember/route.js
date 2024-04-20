import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(req) {
    return Response.json('get')
}

export async function POST(req) {
    const { nickname, id, barArray, clubArray, teamMemberArray } = await req.json();

    try {
        async function update() {
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
        }

        await update()
        return Response.json(true)
    } catch (error) {
        console.log('handler error');
        return Response.json('실패')
    }
}
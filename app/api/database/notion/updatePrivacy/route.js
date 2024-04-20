import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(req) {

    return Response.json('get')
}

export async function POST(req) {
    const { name, birthday, email, tel, id, alarm } = await req.json();

    try {
        async function update() {
            const response = await notion.pages.update({
                page_id: id,
                properties: {
                    'name': {
                        "id": "title",
                        "type": "title",
                        "title": [
                            {
                                "type": "text",
                                "text": {
                                    "content": name,
                                    "link": null
                                },
                                "plain_text": name,
                            }
                        ]
                    },
                    'alarm': {
                        "checkbox": alarm
                    },
                    'birthday': {
                        "date": {
                            "start": birthday
                        }
                    },
                    'email': {
                        "email": email
                    },
                    'tel': {
                        "phone_number": tel
                    },
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
export default async function makeNotionData({ id, name }) {
    const { Client } = require('@notionhq/client');
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    (async () => {
        const databaseId = process.env.NOTION_PRIVACY;

        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                "property": "kakao_id",
                "rich_text": {
                    "equals": id
                }
            }
        });

        if (response.results.length === 0) {
            //회원가입 필요
            makeMember()
        } else {
            //이미 가입됨
            return ""
        }
    })()

    const makeMember = async () => {
        const databaseId = process.env.NOTION_MEMBER;
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                "nickname": {
                    "title": [
                        {
                            "text": {
                                "content": ""
                            }
                        }
                    ]
                },
            }
        })
        makePrivacy(response.id)
    }

    const makePrivacy = async (userPageId) => {
        const databaseId = process.env.NOTION_PRIVACY;
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                "name": {
                    "title": [
                        {
                            "text": {
                                "content": name
                            }
                        }
                    ]
                },
                "kakao_id": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": id,
                            },
                            "annotations": {
                                "bold": false,
                                "italic": false,
                                "strikethrough": false,
                                "underline": false,
                                "code": false,
                                "color": "default"
                            },
                            "plain_text": id,
                            "href": null
                        }
                    ]
                },
                "member": {
                    "type": "relation",
                    "relation": [{
                        "id": userPageId
                    }]
                }
            }
        })

        // 처음 가입한 인원 대상으로 마이페이지로 바로 이동하게 하고 싶음...
    }
}
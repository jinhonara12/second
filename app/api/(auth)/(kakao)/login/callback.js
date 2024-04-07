export default async function callBack({ id, properties: { nickname } }) {
    const { Client } = require('@notionhq/client');

    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const checkId = async () => {
        const databaseId = process.env.NOTION_PRIVACY;
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                "property": "kakao-id",
                number: {
                    "equals": id
                }
            }
        });

        if (response.results.length === 0) {
            console.log("회원가입 필요합니다")
            makeMember()
        } else {
            console.log("이미 가입되어 있습니다.")
            // 마이페이지로 이동
        }
    };
    checkId()

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
                                "content": nickname
                            }
                        }
                    ]
                },
                "kakao-id": {
                    "number": 232323
                },
                "member": {
                    "type": "relation",
                    "relation": [{
                        "id": userPageId
                    }]
                }
            }
        })

        // 마이페이지로 이동
    }

}
import { Client } from '@notionhq/client'
const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function GET(req) {
    const response = notion.databases.query({
        database_id: '유저 노션 데이터베이스 아이디'
    })

    return Response.json('get')
}

// 전역 변수를 사용하여 현재 처리 중인 요청 여부를 추적합니다.
let isProcessing = false;

export async function POST(req) {

    try {
        // 만약 이미 다른 요청을 처리 중이라면, 현재 요청을 대기시킵니다.
        while (isProcessing) {
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        isProcessing = true; // 현재 요청을 처리 중으로 설정합니다.

        const { page_id, user_id, type, page_type } = await req.json();

        // 노션 API 호출
        const currentFestArray = await notion.pages.retrieve({
            page_id: user_id
        });

        const currentFest = currentFestArray.properties[page_type].relation;

        const updatedFest = [];

        if (JSON.parse(type) === false) {
            updatedFest.push(...currentFest, { "id": page_id });
        } else if (JSON.parse(type) === true) {
            updatedFest.push(...currentFest.filter(i => i.id !== page_id));
        }

        // 노션 API 호출
        const response = await notion.pages.update({
            page_id: user_id,
            properties: {
                [page_type]: {
                    "relation": updatedFest
                }
            },
        });

        isProcessing = false; // 현재 요청 처리가 완료되었음을 표시합니다.

        return Response.json(true);

    } catch (error) {
        console.log('handler error:', error);
        isProcessing = false; // 에러 발생 시 처리가 완료되었음을 표시합니다.
        return Response.json(false);
    }
}
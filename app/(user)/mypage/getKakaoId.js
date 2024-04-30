import { authOptions } from '../../api/auth/[...nextauth]/route'
import { getServerSession } from "next-auth/next"

export default async function getKakaoId() {
    try {
        const response = await getServerSession(authOptions);
        if (response === null) {
            return null;
        }
        const { token: { sub: kakao_id } } = response;
        return kakao_id;
    } catch (error) {
        console.error("Error fetching Kakao ID:", error);
        throw error; // 에러를 다시 던져서 호출한 쪽에서 처리할 수 있도록 합니다.
    }
}
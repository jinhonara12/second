import { authOptions } from '../../api/auth/[...nextauth]/route'
import { getServerSession } from "next-auth/next"

export default async function getKakaoId() {
    const { token: { sub: kakao_id } } = await getServerSession(authOptions);

    return kakao_id
}
import getKakaoId from "./getKakaoId";
import getUserId from "../../api/database/notion/userId";

export default async function getUser() {
    const kakaoId = await getKakaoId();
    if (kakaoId != null) {
        const userId = getUserId(kakaoId)
        return userId;
    } else {
        return null;
    }
}
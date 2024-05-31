import getKakaoId from "./getKakaoId";
import getUserHeart from "../../api/database/notion/eventHeart";

export default async function getUserProfile() {
    const kakaoId = await getKakaoId();
    if (kakaoId != null) {
        const userHeart = getUserHeart(kakaoId)
        return userHeart;
    } else {
        return null;
    }
}
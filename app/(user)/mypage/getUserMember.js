import getKakaoId from "./getKakaoId";
import getMemberData from "../../api/database/notion/member";

export default async function getUserProfile() {
    const kakaoId = await getKakaoId();
    if (kakaoId != null) {
        const memberData = getMemberData(kakaoId)
        return memberData;
    } else {
        return null;
    }
}
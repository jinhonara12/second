import getKakaoId from "./getKakaoId";
import getPrivacyData from "../../api/database/notion/privacy";
import getMemberData from "../../api/database/notion/member";

export default async function getUserProfile() {
    const kakaoId = await getKakaoId();
    if (kakaoId != null) {
        const [privacyData, memberData] = await Promise.all([
            getPrivacyData(kakaoId),
            getMemberData(kakaoId)
        ]);
        return { privacyData, memberData };
    } else {
        return null;
    }
}
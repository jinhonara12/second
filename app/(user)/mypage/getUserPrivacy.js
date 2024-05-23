import getKakaoId from "./getKakaoId";
import getPrivacyData from "../../api/database/notion/privacy";

export default async function privacyData() {
    const kakaoId = await getKakaoId();
    if (kakaoId != null) {
        const privacyData = await getPrivacyData(kakaoId)

        return privacyData;
    } else {
        return null;
    }
}
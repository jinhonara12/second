import getKakaoId from "./getKakaoId";
import getMemberAwards from "../../api/database/notion/awards";

export default async function getUserAwards() {
    const kakaoId = await getKakaoId();
    if (kakaoId != null) {
        const awardsData = getMemberAwards(kakaoId)
        return awardsData;
    } else {
        return null;
    }
}
import callBack from "./callback";

export default async function getKakaoUser({ access_token }) {
    const url = "https://kapi.kakao.com/v2/user/me";
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });

    const userData = await response.json();
    return callBack(userData);
}
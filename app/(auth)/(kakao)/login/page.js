import getKakaoUser from "./getKakaoUser";

export default async function fetchKakaoToken(req, res) {
    const url = "https://kauth.kakao.com/oauth/token";
    const Code = req.searchParams.code
    const data = new URLSearchParams();
    data.append('grant_type', 'authorization_code');
    data.append('client_id', process.env.KAKAO_API);
    data.append('redirect_uri', process.env.KAKAO_RE_URL);
    // 카카오 api에서 서버로 인가코드를 get으로 전달 받음
    data.append('code', Code);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
    });

    const tokenData = await response.json();

    await getKakaoUser(tokenData);

    //리다이렉트 url에 등록하고 환경함수에 url 입력해둠

    return '로그인 됨'
}
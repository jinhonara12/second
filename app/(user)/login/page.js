import KakaoLoginButton from './KakaoLoginButton'

export default function Login() {
    const authParams = new URLSearchParams({
        redirect_uri: process.env.KAKAO_RE_URL,
        client_id: process.env.KAKAO_API,
        response_type: "code"
    })
    return (
        <>
            loginPage
            <KakaoLoginButton url={`https://kauth.kakao.com/oauth/authorize?${authParams.toString()}`} />
        </>
    );
}

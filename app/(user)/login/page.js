import KakaoLoginButton from './KakaoLoginButton'

export default function Login() {
    // 유저가 카카오로 로그인하여 서비스 이용 동의 후 인가 코드 받는 작업

    const authParams = new URLSearchParams({
        redirect_uri: process.env.KAKAO_RE_URL,
        client_id: process.env.KAKAO_API,
        response_type: "code",
        // prompt: "login"
    })
    return (
        <>
            loginPage
            <KakaoLoginButton url={`https://kauth.kakao.com/oauth/authorize?${authParams.toString()}`} />
        </>
    );
}

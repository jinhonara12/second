'use client'

export default function KakaoLoginButton({ url }) {
    const handleKakaoLogin = () => {
        const kakaoLoginUrl = url;
        window.open(kakaoLoginUrl);
    };

    return (
        <button onClick={handleKakaoLogin}>카카오로그인</button>
    );
}
'use client'
import Link from "next/link";
import { signOut, signIn, useSession } from "next-auth/react";

function LoginCheck() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <>
            <span>checking...</span>
        </>
    }
    if (status === "authenticated") {
        return <>
            <Link href="/mypage">my page</Link>
            <button onClick={() => {
                signOut()
            }}><img src="/icons/kakao.png" alt="카카오 로그아웃 이미지" />logout</button>
        </>
    } else {
        return <>
            <Link href="/join">join</Link>
            <button onClick={() => {
                signIn("kakao")
            }}><img src="/icons/kakao.png" alt="카카오 로그인 이미지" /> login</button>
        </>
    }
}

export default function Login() {
    return (
        <LoginCheck />
    )
}
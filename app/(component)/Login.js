'use client'
import Link from "next/link";
import { signOut, signIn, SessionProvider, useSession } from "next-auth/react";

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
            }}><img src="/icons/kakao.png" />logout</button>
        </>
    } else {
        return <button onClick={() => {
            signIn("kakao")
        }}><img src="/icons/kakao.png" /> login</button>
    }
}

export default function Login() {
    return (
        <SessionProvider>
            <LoginCheck />
        </SessionProvider>
    )
}
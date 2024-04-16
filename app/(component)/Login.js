'use client'
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut, signIn, SessionProvider } from "next-auth/react";

function LoginCheck() {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return <>
            <Link href="/mypage">my page</Link>
            <button onClick={() => {
                signOut()
            }}>logout</button>
        </>
    } else {
        return <button onClick={() => {
            signIn("kakao", '/mypage')
        }}>kakao login</button>
    }
}

export default function Login() {
    return (
        <SessionProvider>
            <LoginCheck />
        </SessionProvider>
    )
}
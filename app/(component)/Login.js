'use client'
import Link from "next/link";
import { signOut, signIn, SessionProvider, useSession } from "next-auth/react";
import { Suspense } from 'react';
import Loading from './Loading';

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
            signIn("kakao")
        }}>login</button>
    }
}

export default function Login() {
    return (
        <Suspense fallback={<Loading text="login" />}>
            <SessionProvider>
                <LoginCheck />
            </SessionProvider>
        </Suspense>
    )
}
'use client'
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Login() {
    const [isLoggined, setIsLoggined] = useState(false);


    const checkLoginStatus = async function () {
    }
    checkLoginStatus()

    return (
        <Link href="/login">login</Link>
    )
}
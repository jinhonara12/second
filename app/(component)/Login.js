'use client'
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Login() {
    useEffect(() => {
        const fetchLoginStatus = async () => {
            try {
                console.log(1)
                const response = await fetch('../api/login/');
                const data = await response.json();
                console.log(data)

            } catch (error) {

            }
        }

        fetchLoginStatus()
    }, [])


    return (
        <Link href="/login">login</Link>
    )
}
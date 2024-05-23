'use client' // Error components must be Client Components

import { useEffect } from 'react'

import styles from './layout.module.scss'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.log('error 발생')
        console.log(reset)
        console.error(error)
    }, [error])

    return (
        <div className={styles.error_page}>
            <p>서버 응답이 지연되고 있습니다.</p>
            <p>이 문제는 10초 이상의 지연이 생겼을 때 발생하는 오류로 새로고침하여 다시 접속해주시기 바랍니다.</p>
        </div>
    )
}
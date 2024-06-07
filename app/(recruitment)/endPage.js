'use client'
import Link from 'next/link';
import styles from './end.module.scss';
import { usePathname } from 'next/navigation'

export default function end({ path }) {
    const pathname = usePathname();
    const pathCheck = pathname.includes("end");
    return (
        <div className={styles.path}>
            <Link className={pathCheck ? "" : styles.active} href={`/${path}`}>모집</Link>
            <Link className={pathCheck ? styles.active : ""} href={`/${path}/end`}>종료</Link>
        </div>
    )
}
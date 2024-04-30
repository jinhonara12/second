'use client'
import styles from './Nav.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

export default function Nav() {
    const pathname = usePathname();
    return (
        <nav className={styles.nav}>
            <Link className={pathname === "/" ? styles.active : ""} href="/">home</Link>
            <Link className={pathname === "/about" ? styles.active : ""} href="/about">about</Link>
            <Link className={pathname === "/club" ? styles.active : ""} href="/club">club</Link>
            <Link className={pathname === "/bar" ? styles.active : ""} href="/bar">bar</Link>
            <Link className={pathname === "/team" ? styles.active : ""} href="/team">team</Link>
            {/* <Link className={pathname === "/daily_dj" ? styles.active : ""} href="/daily_dj">daily dj</Link> */}
            {/* <Link className={pathname === "/community" ? styles.active : ""} href="/community">community</Link> */}
            {/* <Link className={pathname === "/oneday" ? styles.active : ""} href="/oneday">oneday</Link> */}
            {/* <Link className={pathname === "/awards" ? styles.active : ""} href="/awards">awards</Link> */}
        </nav>
    )
}
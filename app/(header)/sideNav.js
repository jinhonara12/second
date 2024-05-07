'use client'
import Link from "next/link";
import styles from './sideNav.module.scss';
import { usePathname } from 'next/navigation'

export default function SideNav() {
    const pathname = usePathname()
    return (
        <aside className={styles.side__box}>
            <h3>recruitment</h3>
            <ul>
                <li className={pathname === "/class-recruitment" ? styles.active : ""}>
                    <Link href="/class-recruitment">
                        <span>class</span>
                        <span>강습 모집</span>
                    </Link>
                </li>
                <li className={pathname === "/team-recruitment" ? styles.active : ""}>
                    <Link href="/team-recruitment">
                        <span>team</span>
                        <span>팀원 모집</span>
                    </Link>
                </li>
                <li className={pathname === "/workshop-recruitment" ? styles.active : ""}>
                    <Link href="/workshop-recruitment">
                        <span>workshop</span>
                        <span>워크샵 모집</span>
                    </Link>
                </li>
                <li className={pathname === "/event-recruitment" ? styles.active : ""}>
                    <Link href="/event-recruitment">
                        <span>event</span>
                        <span>대회 모집</span>
                    </Link>
                </li>
                <li className={pathname === "/festival-recruitment" ? styles.active : ""}>
                    <Link href="/festival-recruitment">
                        <span>festival</span>
                        <span>행사 모집</span>
                    </Link>
                </li>
            </ul>
        </aside >
    )
}
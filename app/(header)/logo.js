'use client'

import Login from '../(component)/Login';
import Mobile from './Mobile';
import Link from "next/link";
import styles from './header.module.scss';
import { Yeseva_One } from 'next/font/google';
import { SessionProvider } from "next-auth/react";

const yeseva = Yeseva_One({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
})

export default function Logo() {
    return (
        <SessionProvider>
            <div className={styles.logo__box} >
                <div className={styles.left}>
                </div>
                <div className={styles.center}>
                    <h1 className={yeseva.className}>
                        <Link href="/">Daily Swing
                            <span>beta</span>
                        </Link>
                    </h1>
                    <div className={styles.mo}>
                        <Mobile className={yeseva.className} />
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.pc}><Login /></div>
                </div>
            </div >
        </SessionProvider>
    )
}
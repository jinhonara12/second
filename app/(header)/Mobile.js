'use client';
import { useState } from 'react';
import styles from './header.module.scss';
import Login from '../(component)/Login';
import Link from 'next/link';

export default function Mobile({ className }) {
    const [toggle, setToggle] = useState(false);

    function clickMenu() {
        const body = document.querySelector('body');
        body.style.overflow = !toggle ? 'hidden' : 'visible';
        setToggle(!toggle);
    }

    function Menu() {

        function linkClick() {
            body.style.overflow = !toggle ? 'hidden' : 'visible';
            setToggle(false);
        }

        return (
            <div className={styles.mo_menu}>
                <div className={styles.wrapping}>
                    <div className={styles.title_box}>
                        <p className={className}>Daily Swing</p>
                    </div>
                    <div className={styles.login_box}>
                        <Login />
                    </div>
                    <div className={styles.link_box}>
                        <ul>
                            <li>
                                <Link onClick={linkClick} href="/">
                                    <span>home</span>
                                    <span>메인</span>
                                </Link>
                            </li>
                            <li>
                                <Link onClick={linkClick} href="/about">
                                    <span>about</span>
                                    <span>소개</span>
                                </Link>
                            </li>
                            <li>
                                <Link onClick={linkClick} href="/club">
                                    <span>club</span>
                                    <span>동호회</span>
                                </Link>
                            </li>
                            <li>
                                <Link onClick={linkClick} href="/bar">
                                    <span>bar</span>
                                    <span>바</span>
                                </Link>
                            </li>
                            <li>
                                <Link onClick={linkClick} href="/team">
                                    <span>team</span>
                                    <span>팀</span>
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <Link onClick={linkClick} href="/class-recruitment">
                                    <span>class</span>
                                    <span>강습 모집</span>
                                </Link>
                            </li>
                            <li>
                                <Link onClick={linkClick} href="/team-recruitment">
                                    <span>team</span>
                                    <span>팀원 모집</span>
                                </Link>
                            </li>
                            <li>
                                <Link onClick={linkClick} href="/workshop-recruitment">
                                    <span>workshop</span>
                                    <span>워크샵 모집</span>
                                </Link>
                            </li>
                            <li>
                                <Link onClick={linkClick} href="/event-recruitment">
                                    <span>event</span>
                                    <span>대회 모집</span>
                                </Link>
                            </li>
                            <li>
                                <Link onClick={linkClick} href="/festival-recruitment">
                                    <span>festival</span>
                                    <span>행사 모집</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={styles.mo_button} onClick={clickMenu}>
                {toggle ? <img src="/icons/mobile_close.svg" /> : <img src="/icons/mobile_icon.svg" />}
            </div>
            {toggle && <Menu />}
        </>
    )
}
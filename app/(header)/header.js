import Link from "next/link";
import styles from './header.module.scss';
import { Yeseva_One } from 'next/font/google';
// import fetchData from '../lib/database/club';
import data from '../lib/static_database/club';
import Login from '../(component)/Login'
import Nav from './Nav';
import Mobile from './Mobile';

const yeseva = Yeseva_One({
    subsets: ['latin'],
    display: 'swap',
    weight: '400',
})

// 로고

function Logo() {
    return (
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
    )
}

// 커스텀바

function Time() {
    const enDay = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const krDay = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    const enMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const krMonths = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    const krDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
    const serverDay = krDay[new Date(krDate).getDay()];
    const serverDate = `${new Date(krDate).getDate()}일`;
    const serverMonth = krMonths[new Date(krDate).getMonth()];
    const serverYear = `${new Date(krDate).getFullYear()}년`;


    return (
        <div className={styles.time}>
            <div className={styles.left}>
                <span>{serverYear}</span>
                <span>{serverMonth}</span>
                <span>{serverDate}</span>
                <span>{serverDay}</span>
            </div >
            <div className={styles.right}>
            </div >
        </div>
    )
}

// const getClubData = async () => {
//     const result = await fetchData();
//     return result;
// }

async function TodayClubList() {
    // const data = await getClubData();

    const krDay = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    const serverDay = krDay[new Date().getDay()];

    const todayClub = data.reduce((acc, page) => {
        const isTodayClub = page.mainday.some(days => days.name === serverDay);
        if (isTodayClub) {
            acc.push(page.name);
        }
        return acc;
    }, []);

    return (
        <div className={styles.club__list}>
            {todayClub.length > 0 ? (
                <>
                    <span>today swing club</span>
                    <div className={styles.club__box}>
                        {todayClub.map(el => (
                            <span key={el}>{el}</span>
                        ))}
                    </div>
                </>
            ) : (
                <span>There are no clubs open today.</span>
            )}
        </div>
    )
}

function CustomBar() {
    return (
        <div className={styles.custom__bar}>
            <Time />
            <TodayClubList />
        </div>
    )
}

function Header() {
    return (
        <header className={styles.header} >
            <Logo />
            <CustomBar />
            <Nav />
        </header >
    )
}

export default Header
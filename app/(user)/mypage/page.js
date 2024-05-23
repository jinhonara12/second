import getUserPrivacy from './getUserPrivacy';
import styles from './mypage.module.scss';
import Link from 'next/link';

export const metadata = {
    title: "마이페이지",
};

export default async function MyPage() {
    let number;
    const response = await getUserPrivacy();

    if (response !== null) {
        if (response.index === 1) {
            number = "1st"
        } else if (response.index === 2) {
            number = "2nd"
        } else if (response.index === 3) {
            number = "3rd"
        } else {
            number = `${response.index}th`
        }

        return (
            <main className={styles.main}>
                <section className={styles.mypage}>
                    <div className={styles.join}>
                        <p className={styles.en}>"You are the <span>{number}</span> member to have been with Daily Swing since {response.join}"</p>
                        <p className={styles.kr}>데일리스윙에 {response.join}부터 함께해주신 <span>{response.index}번</span> 회원입니다.</p>
                    </div>

                    <div className={styles.link}>
                        <div className={styles.privacy}>
                            <div className={styles.text}>
                                <p className={styles.title}>개인정보</p>
                                <span>- 회원의 개인 정보를 확인하고 변경할 수 있습니다.</span>
                            </div>
                            <Link href="/mypage/privacy">privacy <img src="/icons/link_24px.png" /></Link>
                        </div>
                        <div className={styles.member}>
                            <div className={styles.text}>
                                <p className={styles.title}>스윙댄서 정보</p>
                                <span>- 회원의 스윙 정보를 확인하고 변경할 수 있습니다.</span>
                            </div>
                            <Link href="/mypage/member">member <img src="/icons/link_24px.png" /></Link>
                        </div>
                    </div>


                </section>
            </main>
        )
    } else {
        return (
            <div className={styles.not_loggined}>
                <p>로그인이 제대로 되지 않았습니다.</p>
                <p>다시 로그인을 부탁드립니다.</p>
                <p>지속적인 문제가 생길시 오류 화면 문의 주시면 빠르게 처리하겠습니다.</p>
            </div>
        )
    }
}
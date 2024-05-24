import Link from 'next/link'
import styles from './layout.module.scss'

export default function NotFound() {
    return (
        <div className={styles.error_page}>
            <div className={styles.title}>
                <h2>404 : Are you lost?</h2>
                <p>길을 잃으셨나요?</p>
            </div>
            <div className={styles.content}>
                <div className={styles.text_box}>
                    <p>찾으시는 페이지가 없다면 데일리스윙에게 알려주세요.</p>
                    <div className={styles.small}>
                        <p>데일리스윙은 린디하퍼의 커뮤니티 지향하고 있어요.</p>
                        <p>가끔 길을 헤매더라도 함께 할 수 있는 공간을 만들고 있습니다.</p>
                    </div>

                </div>
                <div className={styles.link_box}>
                    <Link href="/">처음으로 돌아가기</Link>
                    <a href={process.env.GOOGLE_DATA_FORM} target="_blank">원하는 내용 알려주기</a>
                </div>
            </div>
        </div>
    )
}
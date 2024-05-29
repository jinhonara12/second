import Link from 'next/link';
import styles from './error.module.scss';

export default function ErrorPage({ text }) {
    return (
        <div className={styles.error_page}>
            <div className={styles.title}>
                <h2>{text} error : Got a problem?</h2>
                <p>문제가 생겼나요?</p>
            </div>
            <div className={styles.content}>
                <div className={styles.text_box}>
                    <p>문제가 지속적으로 발생한다면 데일리스윙에게 알려주세요.</p>
                    <div className={styles.small}>
                        <p>데일리스윙은 린디하퍼 커뮤니티를 지향하고 있어요.</p>
                        <p>가끔 길을 헤매더라도 함께 할 수 있는 공간을 만들고 있습니다.</p>
                    </div>

                </div>
                <div className={styles.link_box}>
                    <Link href="/">처음으로 돌아가기</Link>
                    <a href={process.env.GOOGLE_DATA_FORM} target="_blank">오류 제보하기</a>
                </div>
            </div>
        </div>
    )
}
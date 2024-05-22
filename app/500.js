import styles from './layout.module.scss'

export default function page500() {
    return (
        <div className={styles.error_page}>
            <h2>오류 - 500</h2>
            <p>서버가 응답하지 않습니다.</p>
            <p>동시 접속이 발생하였거나 서버로부터 10초 이상의 지연이 생겼습니다.</p>
        </div>
    )
}
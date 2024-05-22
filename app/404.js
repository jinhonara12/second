import styles from './layout.module.scss'

export default function page404() {
    return (
        <div className={styles.error_page}>
            <h2>오류 - 404</h2>
            <p>페이지를 찾을 수 없습니다.</p>
        </div>
    )
}
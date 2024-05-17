import styles from './layout.module.scss'

export default function NotFound() {
    return (
        <div className={styles.not_found}>
            <h2>존재하지 않는 페이지입니다.</h2>
        </div>
    )
}
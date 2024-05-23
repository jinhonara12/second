import getUserPrivacy from '../getUserPrivacy';
import PrivacyForm from './PrivacyForm';
import styles from '../mypage_sub.module.scss';

export default async function privacy() {
    const response = await getUserPrivacy();
    if (response !== null) {
        return (
            <div className={styles.main}>
                <p className={styles.title}>
                    privacy
                </p>
                <div className={styles.form}>
                    <PrivacyForm privacy={response} />
                </div>
            </div>
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
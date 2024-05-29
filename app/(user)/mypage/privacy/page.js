import getUserPrivacy from '../getUserPrivacy';
import PrivacyForm from './PrivacyForm';
import styles from '../mypage_sub.module.scss';
import ErrorPage from '../../../(component)/Error_page';

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
        return <ErrorPage text="Login" />
    }


}
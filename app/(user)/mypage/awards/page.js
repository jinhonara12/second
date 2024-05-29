import userAwardsData from '../getUserAwards';
import AwardsList from './AwardsList';
import AwardForm from './AwardsForm';
import styles from '../mypage_sub.module.scss';
import getUserId from '../getUserId';
import ErrorPage from '../../../(component)/Error_page';

export default async function awards() {
    const response = await userAwardsData();
    const userId = await getUserId();

    if (response !== null) {
        return (
            <div className={styles.main}>
                <p className={styles.title}>
                    awards
                </p>
                <div className={styles.awards_list}>
                    <AwardsList list={response} />
                </div>
                <div className={styles.form}>
                    <AwardForm data={userId} />
                </div>
            </div>
        )
    } else {
        return <ErrorPage text="Login" />
    }
}
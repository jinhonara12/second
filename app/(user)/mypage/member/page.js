import getUserMember from '../getUserMember';
import barData from '../../../lib/static_database/bar';
import clubData from '../../../lib/static_database/club';
import teamData from '../../../lib/static_database/team';
import MemberForm from './MemberForm';
import styles from '../mypage_sub.module.scss';
import ErrorPage from '../../../(component)/Error_page';

// import getBarList from '../../../lib/database/bar';
// import getClubList from '../../../lib/database/club';
// import getTeamList from '../../../lib/database/team';

export default async function member() {
    const response = await getUserMember();

    if (response !== null) {
        return (
            <div className={styles.main}>
                <p className={styles.title}>
                    member
                </p>
                <div className={styles.form}>
                    <MemberForm member={response} bar={barData} club={clubData} team={teamData} />
                </div>
            </div>
        )
    } else {
        return <ErrorPage text="Login" />
    }


}
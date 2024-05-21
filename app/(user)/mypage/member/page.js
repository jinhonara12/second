import getUserProfile from '../getUserProfile';
import getBarList from '../../../lib/database/bar';
import getClubList from '../../../lib/database/club';
import getTeamList from '../../../lib/database/team';
import MemberForm from './MemberForm';
import styles from '../mypage_sub.module.scss';

export default async function member() {
    const resposne = await getUserProfile();
    if (resposne !== null) {
        const memberData = resposne.memberData;
        const barList = await getBarList();
        const clubList = await getClubList();
        const teamList = await getTeamList();

        return (
            <div className={styles.main}>
                <p className={styles.title}>
                    member
                </p>
                <div className={styles.form}>
                    <MemberForm member={memberData} bar={barList} club={clubList} team={teamList} />
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
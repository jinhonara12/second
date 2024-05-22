import getUserProfile from '../getUserProfile';
import getBarList from '../../../lib/database/bar';
import getClubList from '../../../lib/database/club';
import getTeamList from '../../../lib/database/team';
import MemberForm from './MemberForm';
import styles from '../mypage_sub.module.scss';

export default async function member() {
    const resposne = await getUserProfile();
    // 마이페이지에서 캐싱한 데이터 가져와서 사용 / 동일한 데이터임.
    if (resposne !== null) {
        const memberData = resposne.memberData;
        // 마이페이지에서 아마 이것도 캐싱할 수 있을 거임
        const [barList, clubList, teamList] = await Promise.all([
            getBarList(),
            getClubList(),
            getTeamList()
        ]);

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
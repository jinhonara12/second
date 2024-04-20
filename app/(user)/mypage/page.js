import getUserProfile from './getUserProfile';
import getBarList from '../../lib/database/bar';
import getClubList from '../../lib/database/club';
import getTeamList from '../../lib/database/team';
import styles from './mypage.module.scss';
import PrivacyForm from './PrivacyForm';
import MemberForm from './MemberForm';

export default async function MyPage() {
    if (getUserProfile !== null) {
        const userProfile = await getUserProfile();
        const barList = await getBarList();
        const clubList = await getClubList();
        const teamList = await getTeamList();
        const privacyData = userProfile.privacyData;
        const memberData = userProfile.memberData;
        let number;

        if (privacyData.index === 1) {
            number = "1st"
        } else if (privacyData.index === 2) {
            number = "2nd"
        } else if (privacyData.index === 3) {
            number = "3rd"
        } else {
            number = `${privacyData.index}th`
        }

        return (
            <main className={styles.main}>
                <section className={styles.mypage}>
                    <div className={styles.join}>
                        <p className={styles.en}>"You are the <span>{number}</span> member to have been with Daily Swing since {privacyData.join}"</p>
                        <p className={styles.kr}>데일리스윙에 {privacyData.join}부터 함께해주신 <span>{privacyData.index}번</span> 회원입니다.</p>
                    </div>

                    <div className={styles.privacy}>
                        <p className={styles.title}>
                            privacy
                        </p>
                        <PrivacyForm privacy={privacyData} />
                    </div>

                    <div className={styles.member}>
                        <p className={styles.title}>
                            member
                        </p>
                        <MemberForm member={memberData} bar={barList} club={clubList} team={teamList} />
                    </div>
                </section>
            </main>
        )
    } else {
        return (
            <div>
                <p>로그인 기능에 문제가 생겼습니다.</p>
                <p>다시 로그인을 부탁드립니다. 지속적인 문제가 생길시 오류 화면 문의 주시면 빠르게 처리하겠습니다.</p>
            </div>
        )
    }

}
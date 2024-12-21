import QuitForm from "./QuitForm"
import styles from "../mypage_sub.module.scss"
import getUserPrivacy from "../getUserPrivacy"
import getUserMember from "../getUserMember"
import userAwardsData from "../getUserAwards"

export default async function quit() {
    const userAwardList = await userAwardsData()
    const privacyId = await getUserPrivacy()
    const memberId = await getUserMember()
    return (
        <div className={styles.main}>
            <p className={styles.title}>quit</p>
            <div className={styles.form}>
                <QuitForm member={memberId} privacy={privacyId} awards={userAwardList} />
            </div>
        </div>
    )
}

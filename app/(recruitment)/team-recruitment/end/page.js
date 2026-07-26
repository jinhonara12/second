import response from "../../../lib/static_database/teamRecruitment"
import styles from "../page.module.scss"
import End from "../../endPage"
import TeamEndList from "./TeamEndList"

export const metadata = {
    title: "팀",
    description: "스윙댄스 종료된 팀 모집 리스트입니다.",
}

export default async function page() {
    return (
        <main className={styles.main}>
            <End path="team-recruitment" />
            <section>
                <TeamEndList response={response} />
            </section>
        </main>
    )
}

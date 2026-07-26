import fetch from "../../lib/database/team-recuritment"
import styles from "./page.module.scss"
import End from "../endPage"
import TeamList from "./TeamList"

export const revalidate = 300
export const metadata = {
    title: "팀",
    description: "스윙댄스 팀 모집 리스트입니다.",
}

export default async function page() {
    const response = await fetch()

    return (
        <main className={styles.main}>
            <End path="team-recruitment" />
            <section>
                <TeamList response={response} />
            </section>
        </main>
    )
}

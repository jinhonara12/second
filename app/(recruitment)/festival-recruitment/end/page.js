import response from "../../../lib/static_database/festivalRecruitment"
import styles from "../page.module.scss"
import End from "../../endPage"
import FestivalEndList from "./FestivalEndList"

export const metadata = {
    title: "행사",
    description: "스윙댄스 종료된 행사 모집 리스트입니다.",
}

export default async function page() {
    return (
        <main className={styles.main}>
            <End path="festival-recruitment" />
            <section className={styles.section}>
                <FestivalEndList response={response} />
            </section>
        </main>
    )
}

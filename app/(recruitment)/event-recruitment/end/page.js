import response from "../../../lib/static_database/eventRecruitment"
import styles from "../page.module.scss"
import End from "../../endPage"
import EventEndList from "./EventEndList"

export const metadata = {
    title: "대회",
    description: "스윙댄스 종료된 대회 모집 리스트입니다.",
}

export default async function page() {
    return (
        <main className={styles.main}>
            <End path="event-recruitment" />
            <section className={styles.section}>
                <EventEndList response={response} />
            </section>
        </main>
    )
}

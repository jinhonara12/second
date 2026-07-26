import response from "../../../lib/static_database/workShopRecruitment"
import styles from "../page.module.scss"
import End from "../../endPage"
import WorkshopEndList from "./WorkshopEndList"

export const metadata = {
    title: "워크샵",
    description: "스윙댄스 종료된 워크샵 모집 리스트입니다.",
}

export default async function page() {
    return (
        <main className={styles.main}>
            <End path="workshop-recruitment" />
            <section className={styles.section}>
                <WorkshopEndList response={response} />
            </section>
        </main>
    )
}

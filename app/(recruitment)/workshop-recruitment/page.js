import fetch from "../../lib/database/workshop-recuritment"
import styles from "./page.module.scss"
import End from "../endPage"
import WorkshopList from "./WorkshopList"

export const revalidate = 300
export const metadata = {
    title: "워크샵",
    description: "스윙댄스 워크샵 모집 리스트입니다.",
}

export default async function page() {
    const response = await fetch()

    return (
        <main className={styles.main}>
            <End path="workshop-recruitment" />
            <section className={styles.section}>
                <WorkshopList response={response} />
            </section>
        </main>
    )
}

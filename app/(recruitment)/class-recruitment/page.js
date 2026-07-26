import fetch from "../../lib/database/class-recuritment"
import styles from "./page.module.scss"
import End from "../endPage"
import ClassList from "./ClassList"

export const revalidate = 300
export const metadata = {
    title: "강습",
    description: "스윙댄스 동호회의 강습 모집 리스트입니다.",
}

export default async function page() {
    const response = await fetch()

    return (
        <main className={styles.main}>
            <End path="class-recruitment" />
            <section>
                <ClassList response={response} />
            </section>
        </main>
    )
}

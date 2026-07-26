import response from "../../../lib/static_database/classRecruitment"
import styles from "../page.module.scss"
import End from "../../endPage"
import ClassEndList from "./ClassEndList"

export const metadata = {
    title: "강습",
    description: "스윙댄스 동호회의 종료된 강습 모집 리스트입니다.",
}

export default async function page() {
    return (
        <main className={styles.main}>
            <End path="class-recruitment" />
            <section>
                <ClassEndList response={response} />
            </section>
        </main>
    )
}

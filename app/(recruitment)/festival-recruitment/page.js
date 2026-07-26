import fetch from "../../lib/database/festival-recuritment"
import styles from "./page.module.scss"
import getUserHeart from "../../(user)/mypage/getUserHeart"
import Session from "./Session"
import End from "../endPage"
import FestivalList from "./FestivalList"

// export const revalidate = 300 → 정적으로 페이지를 만들고 싶지만 getUserHeart 여기서 동적으로 카카오를 불러오고 있어서 동적페이지로 변환되어야함
export const dynamic = "force-dynamic"
export const metadata = {
    title: "행사",
    description: "스윙댄스 행사 모집 리스트입니다.",
}

export default async function page() {
    const response = await fetch()
    const userInfo = await getUserHeart()

    return (
        <Session>
            <main className={styles.main}>
                <End path="festival-recruitment" />
                <section className={styles.section}>
                    <FestivalList response={response} userInfo={userInfo} />
                </section>
            </main>
        </Session>
    )
}

import styles from "./page.module.scss"
import fetchAwards from "../../lib/database/awards"
import AwardsList from "./awardsList"

export const revalidate = 300
export const metadata = {
    title: "수상",
    description: "각종 스윙댄스 대회 수상자 리스트입니다.",
}

export default async function page() {
    const response = await fetchAwards()

    return (
        <main className={styles.main}>
            <div className={styles.contents}>
                <div className={styles.info}>
                    <p>✅ 이용방법</p>
                    <div>
                        <p>- Only Members 🙇🏻‍♂️ : 로그인 후 마이페이지에서 수상 경력을 등록하실 수 있습니다.</p>
                        <p>- Sorting 🔃 : 리스트의 상단 항목을 클릭하시면 정렬하실 수 있습니다.</p>
                        <p>- Dream Come True ⭐️ : 수상하고 싶은 대회가 있다면 먼저 선점해보세요.</p>
                    </div>
                </div>

                <div className={styles.caution}>
                    <p>⚠️ 주의사항</p>
                    <div>
                        <p>
                            - Fake News 🔎 : 대회 종료 후 실제 수상 결과와 다른 데이터가 등록되어 있는 경우 해당
                            데이터는 삭제될 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>
            <AwardsList data={response} />
        </main>
    )
}

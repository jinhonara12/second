"use client"
import styles from "./quitForm.module.scss"
import { useState } from "react"
import { signOut, signIn, useSession } from "next-auth/react"

export default function quitForm({ member, privacy, awards }) {
    const { page_id: memberId } = member
    const { page_id: privacyId } = privacy
    const awardsIds = awards ? awards.map((e) => e.page_id) : []
    const idArrays = [...awardsIds, memberId, privacyId]
    console.log(idArrays)

    const [state, setState] = useState(true)

    const deleteNotionData = async (ids) => {
        const checkDelete = confirm("회원 탈퇴하시겠습니까?")

        if (checkDelete && state) {
            setState(false)

            const deleteData = async (data) => {
                if (data) {
                    try {
                        const postFetch = await fetch("/api/database/notion/deleteNotionData", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data),
                        })
                        const response = await postFetch.json()
                        return response
                    } catch (error) {
                        console.error("Error deleting data:", error)
                    }
                }
            }

            // 모든 ID에 대해 비동기 삭제 요청 실행
            const results = await Promise.all(ids.map((id) => deleteData({ page_id: id })))

            // 모든 작업이 성공했는지 확인
            const allSuccessful = results.every((res) => res === true)

            if (allSuccessful) {
                signOut()
            } else {
                alert("회원 탈퇴에 문제가 생겼습니다. 별도로 문의 바랄게요.")
            }
        }
    }

    return (
        <div className={styles.quit_form}>
            <div className={styles.text}>
                <p>회원탈퇴를 하시겠습니까?</p>
                <div className={styles.sub}>
                    <span>탈퇴하시면 제공하셨던 카카오 고유정보 및 마이페이지 내 정보가 모두 삭제됩니다.</span>
                    <span>탈퇴 이후 카카오 로그인으로 다시 가입하실 수 있습니다.</span>
                </div>
            </div>
            <div className={styles.form}>
                {state ? <button onClick={() => deleteNotionData(idArrays)}>quit</button> : "quiting..."}
            </div>
        </div>
    )
}

"use client"
import Link from "next/link"
import { useState } from "react"
import getEventData from "../../../lib/static_database/eventForAwards"
import styles from "./awardForm.module.scss"

export default function awardsForm({ data }) {
    const { page_id: userId, nickname: userName } = data
    const [update, setUpdate] = useState("update")
    const [state, setState] = useState(true)
    const [eventId, setEventId] = useState("")
    const [division, setDivision] = useState("")
    const [level, setLevel] = useState("")
    const [result, setResult] = useState("")
    const eventGroup = getEventData.reduce((acc, cur) => {
        if (!acc[cur.year]) {
            acc[cur.year] = []
        }
        acc[cur.year].push(cur)
        return acc
    }, {})

    const handleSubmit = (e) => {
        e.preventDefault()
        if (state) {
            setState(false)
            setUpdate("waiting...")
            updateData()
        }
    }

    const updateData = async () => {
        const formData = {
            user_id: userId,
            nickname: userName,
            eventId,
            division,
            level,
            result,
        }
        try {
            const postFetch = await fetch("/api/database/notion/updateAwards", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const response = await postFetch.json()
            setState(response)
            setUpdate("update")
            window.location.reload()
        } catch (error) {
            console.error("Error updating data:", error)
        }
    }

    const clickInputRadio = (e) => {
        switch (e.target.name) {
            case "event":
                setEventId(e.target.value)
                break
            case "division":
                setDivision(e.target.value)
                break
            case "level":
                setLevel(e.target.value)
                break
            case "result":
                setResult(e.target.value)
                break
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.event__form}>
            <div className={styles.inform}>
                <span className={styles.google_form}>
                    - 찾으시는 대회가 없으시다면,{" "}
                    <a href="https://forms.gle/wftQnqtMKK1VVCq96" target="_blank">
                        링크
                    </a>
                    를 클릭해주세요.
                </span>
                <span>
                    - 등록된 수상 내역은{" "}
                    <a href="/awards" target="_blank">
                        수상리스트
                    </a>
                    에 공개 됩니다.
                </span>
                <span>- 아래 항목을 모두 선택 ✅ 해주시고 [UPDATE]를 눌러주세요.</span>
            </div>
            <div className={styles.event_wrap}>
                <h3>nickname</h3>
                <div className={styles.label_nickname}>
                    <label className={styles.label}>
                        {userName.length === 0 ? (
                            <>
                                수상 등록할 닉네임을 <Link href="/mypage/member">마이페이지</Link>에서 등록해주세요.
                            </>
                        ) : (
                            <>
                                수상리스트에 <span className={styles.span}>{userName}</span>으로 표시됩니다.
                            </>
                        )}
                        <input
                            readOnly
                            hidden
                            type="input"
                            value={userName}
                            name="nickname"
                            placeholder="마이페이지에서 등록해주세요."
                        />
                    </label>
                </div>
            </div>
            <div className={styles.event_wrap}>
                <h3>event</h3>
                <div className={`${styles.select}`}>
                    <select onChange={clickInputRadio} name="event" required>
                        <option value="">Select an event ⬇️</option>
                        {Object.keys(eventGroup).map((year) => (
                            <optgroup key={year} label={year}>
                                {eventGroup[year].map((award) => (
                                    <option
                                        key={award.page_id}
                                        value={award.page_id}
                                        className={`${eventId === award.page_id ? styles.checked : ""}`}
                                    >
                                        {award.name}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
            </div>
            <div className={styles.event_wrap}>
                <h3>level</h3>
                <div className={styles.label_wrap}>
                    {["Rookie", "Super Rookie", "Open", "Advanced", "All Star", "Invitational", "All Level"].map(
                        (lvl) => (
                            <label key={lvl} className={`${styles.label} ${level === lvl ? styles.checked : ""}`}>
                                {lvl}
                                <input
                                    onChange={clickInputRadio}
                                    required
                                    hidden
                                    type="radio"
                                    value={lvl}
                                    name="level"
                                />
                            </label>
                        )
                    )}
                </div>
            </div>
            <div className={styles.event_wrap}>
                <h3>division</h3>
                <div className={styles.label_wrap}>
                    {[
                        "M&M",
                        "Strictly",
                        "Couple Routine",
                        "Solo Jazz",
                        "Duo Jazz",
                        "Trio Challenge",
                        "Team Routine",
                        "Team Battle",
                        "Chrous Line",
                        "Charleston-Jazz Roots",
                        "Rhythm & Blues",
                    ].map((div) => (
                        <label key={div} className={`${styles.label} ${division === div ? styles.checked : ""}`}>
                            {div}
                            <input
                                onChange={clickInputRadio}
                                required
                                hidden
                                type="radio"
                                value={div}
                                name="division"
                            />
                        </label>
                    ))}
                </div>
            </div>
            <div className={styles.event_wrap}>
                <h3>result</h3>
                <div className={styles.label_wrap}>
                    {["1st", "2nd", "3rd", "Final"].map((res) => (
                        <label key={res} className={`${styles.label} ${result === res ? styles.checked : ""}`}>
                            {res}
                            <input onChange={clickInputRadio} required hidden type="radio" value={res} name="result" />
                        </label>
                    ))}
                </div>
            </div>

            <button className={`${styles.button} ${!state ? styles.uploading : ""}`} type="submit">
                {update}
            </button>
        </form>
    )
}

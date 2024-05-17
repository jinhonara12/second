import fetch from "../../lib/database/team-recuritment";
import styles from "./page.module.scss";

export const metadata = {
    title: "팀 모집",
    description: "스윙댄스 팀 모집 리스트입니다."
};

export default async function page() {
    const response = await fetch();

    return (
        <main className={styles.main}>
            <section>
                <ul className={styles.list_box}>
                    {response.map((list, index) => {
                        return (
                            <li key={index} className={styles.list}>
                                <div className={styles.left}>
                                    <div className={styles.top}>
                                        <p>{list.team}</p>
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.title}>
                                        <h2>{list.name}</h2>
                                    </div>
                                    <div className={styles.date}>
                                        <div className={styles.dday}>
                                            <span>{list.dday}</span>
                                        </div>

                                        <div className={styles.date_period}>
                                            <span>{list.start_date}</span>
                                            {list.end_date ? <><span>~</span><span>{list.end_date}</span></> : ""}
                                        </div>
                                    </div>
                                    <div className={styles.link}>
                                        {list.url ? <a href={list.url} target='_blank'>신청링크 <img src="/icons/link_24px.png" /></a> : <span>링크 미작성</span>}
                                    </div>
                                    <div className={styles.created_date}>
                                        <span>작성일 | {list.created_time.split('T')[0]}</span>
                                        <span>수정일 | {list.last_modified_time.split('T')[0]}</span>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}
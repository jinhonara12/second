import response from "../../../lib/static_database/eventRecruitment";
import styles from '../page.module.scss';
import End from '../../endPage';

export const metadata = {
    title: "종료된 대회 모집",
    description: "스윙댄스 종료된 대회 모집 리스트입니다."
};

export default async function page() {

    return (
        <main className={styles.main}>
            <End path="event-recruitment" />
            <section className={styles.section}>
                <ul className={styles.list_box}>
                    {response.map((list, index) => {
                        return (
                            <li className={styles.list} key={index}>
                                <div className={styles.img_box}>
                                    {list.photo ? <img src={list.photo} loading="lazy" alt={list.name} /> : <div className={styles.no_img}></div>}
                                </div>

                                <div className={styles.title_box}>
                                    <span>{list.year}</span>
                                    <h3><a href={`/event-recruitment/${list.page_id}?name=${list.name}`}>{list.name} <img src="/icons/link_24px.png" /></a></h3>
                                </div>
                                <div className={styles.date}>
                                    <div className={styles.dday}>
                                        <span>{list.dday}</span>
                                    </div>
                                    <div className={styles.date_period}>
                                        <span>{list.start_date}</span>
                                        {list.end_date ? <><span>-</span><span>{list.end_date}</span></> : ""}
                                    </div>
                                </div>
                                {/* <div className={styles.link}>
                                        {list.home ? <a href={list.home} target='_blank'>홈페이지 <img src="/icons/link_24px.png" /></a> : ""}
                                        {list.url ? <a href={list.url} target='_blank'>신청링크 <img src="/icons/link_24px.png" /></a> : ""}
                                        {list.check_url ? <a href={list.check_url} target='_blank'>확인링크 <img src="/icons/link_24px.png" /></a> : ""}
                                    </div> */}
                                <div className={styles.created_date}>
                                    <span>작성일 | {list.created_time.split('T')[0]}</span>
                                    <span>수정일 | {list.last_modified_time.split('T')[0]}</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}
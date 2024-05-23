import Link from 'next/link';
import styles from './page.module.scss';
import fetchClassData from "../lib/database/class-recuritment";
import fetchTeamData from "../lib/database/team-recuritment";
import fetchWorkshopData from "../lib/database/workshop-recuritment";
import fetchEventData from "../lib/database/event-recuritment";
import fetchFestivalData from "../lib/database/festival-recuritment";

const fetchArray = [fetchClassData, fetchTeamData, fetchWorkshopData, fetchEventData, fetchFestivalData];

async function fetchAllData() {
    const result = await Promise.all(fetchArray.map(fn => fn()));
    return result.flat();
}

async function getSortedData(data, filterCondition) {
    let filteredData = data.filter(filterCondition);
    return filteredData.sort((a, b) => new Date(b.last_modified_time) - new Date(a.last_modified_time));
}

function filterRecentData(page) {
    const date = new Date(page.start_date);
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((date - today) / oneDay);
    return diffDays > 7;
}

function filterWeeklyData(page) {
    const date = new Date(page.start_date);
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((date - today) / oneDay);
    return diffDays <= 7 && diffDays >= 0;
}

async function getData(filterCondition) {
    const data = await fetchAllData();
    return getSortedData(data, filterCondition);
}

export default async function NewsData({ type }) {
    const filterCondition = type === 'recent' ? filterRecentData : filterWeeklyData;
    const sortedData = await getData(filterCondition);
    const repeatCount = type === 'recent' ? 5 : 10;

    if (sortedData.length > 0) {
        return (
            <ul>
                {sortedData.slice(0, repeatCount).map((item, index) => {
                    const last_modified_time = new Date(item.last_modified_time).toLocaleDateString();
                    const created_time = new Date(item.created_time).toLocaleDateString();
                    const type = item.classification;

                    return (
                        <li key={index}>
                            <div className={styles.top}>
                                <p>
                                    {type === 'recent' ? <span>new</span> : null}
                                    <span>{type}</span>
                                    {item.name}
                                </p>
                            </div>
                            <div className={styles.middle}>
                                <div>
                                    <span className={styles.date}>{item.start_date} {item.end_date ? ` - ${item.end_date}` : ""}</span>
                                    <span className={styles.dday}>{item.dday}</span>
                                </div>
                                <div className={styles.middle_2}>
                                    {type === "행사" && <Link href={`festival-recruitment/${item.page_id}?name=${item.name}`}>자세히 보기<img src="/icons/link_24px.png" /></Link>}
                                    {type === "대회" && <Link href={`event-recruitment/${item.page_id}?name=${item.name}`}>자세히 보기<img src="/icons/link_24px.png" /></Link>}
                                    {item.home && <a href={item.home} title={item.name} target="_blank">공식홈페이지<img src="/icons/link_24px.png" /></a>}
                                    {item.url && <a href={item.url} title={item.name} target="_blank">신청링크<img src="/icons/link_24px.png" /></a>}
                                    {item.check_url && <a href={item.check_url} title={item.name} target="_blank">확인링크<img src="/icons/link_24px.png" /></a>}
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                {last_modified_time !== created_time && (
                                    <div>
                                        <span className={styles.date}>modified {last_modified_time}</span>
                                    </div>
                                )}
                                <div>
                                    <span className={styles.date}>created {created_time}</span>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    } else {
        return (
            <p className={styles.not}>
                {type === 'recent' ? '최근 수정 또는 등록된 모집 게시글이 없습니다.' : '7일 이내 마감되는 모집 게시글이 없습니다.'}
            </p>
        );
    }
}
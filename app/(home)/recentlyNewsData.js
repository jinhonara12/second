import styles from './page.module.scss';
import fetchClassData from "../lib/database/class-recuritment";
import fetchTeamData from "../lib/database/team-recuritment";
import fetchWorkshopData from "../lib/database/workshop-recuritment";
import fetchEventData from "../lib/database/event-recuritment";
import fetchFestivalData from "../lib/database/festival-recuritment";

// 최신데이터는 수정된 날짜를 기준으로 정렬
// fetch를 5개에서 가져오니 모든 데이터를 가져오는 동안 기다리기 위해서 Promise.all()을 사용

async function getSortedData(array) {
    const result = await Promise.all(array.map(async fn => {
        let data = await fn();
        let vaildData = data.filter(page => page.dday != "종료");
        let sorted = vaildData.sort((a, b) => {
            return new Date(b.last_modified_time) - new Date(a.last_modified_time)
        })
        return sorted
    }));
    return result.flat().sort((a, b) => {
        return new Date(b.last_modified_time) - new Date(a.last_modified_time)
    })
}

export default async function RecentlyNewsData() {
    const repeatCount = 5;
    const fetchArray = [fetchClassData, fetchTeamData, fetchWorkshopData, fetchEventData, fetchFestivalData];
    const sortedData = await getSortedData(fetchArray);
    return (
        <>
            {Array(repeatCount).fill().map((_, index) => {
                const last_modified_time = new Date(sortedData[index].last_modified_time).toLocaleDateString()
                const created_time = new Date(sortedData[index].created_time).toLocaleDateString()

                return <li key={sortedData[index].name} >

                    <div className={styles.top}>
                        <p>
                            <span>new</span>
                            <span>{sortedData[index].classification}</span>
                            {sortedData[index].name}
                        </p>
                    </div>
                    <div className={styles.middle}>
                        <div>
                            <span className={styles.date}>{sortedData[index].start_date} {sortedData[index].end_date ? ` - ${sortedData[index].end_date}` : ""}</span>
                            <span className={styles.dday}>{sortedData[index].dday}</span>
                        </div>

                        <div className={styles.middle_2}>
                            {sortedData[index].url ? <a href={sortedData[index].url} title={sortedData[index].name} target="_blank" >홍보링크</a> : null}
                            {sortedData[index].check_url ? <a href={sortedData[index].check_url} title={sortedData[index].name} target="_blank" >확인링크</a> : null}
                        </div>
                    </div>

                    <div className={styles.bottom}>
                        {last_modified_time != created_time ?
                            <div>
                                <span className={styles.writer}>{sortedData[index].last_modifier_user}</span>
                                <span className={styles.date}>modified {last_modified_time}</span>
                            </div>
                            :
                            null
                        }
                        <div>
                            <span className={styles.writer}>{sortedData[index].creator_user}</span>
                            <span className={styles.date}>created {created_time}</span>
                        </div>
                    </div>
                </li>
            })}
        </>

    )

}

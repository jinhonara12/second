import styles from './page.module.scss';
import teamData from '../../lib/database/team';

async function getTeamData() {
    const response = await teamData();
    return response;
}

//  getTeamData 구조
//     1. name: '',
//     2. dayArray: []
//     3. teacherArray: []
//     4. instagram: '',
//     5. (공개안함)memberArray: [], 
//     6. recruitmentArray: [[]]

export default async function TeamList() {
    const dataArray = await getTeamData();

    return (
        <div className={styles.team_list}>
            <ul className={styles.team_ul}>
                {dataArray.map((team, idx) => (
                    <li className={styles.team} key={idx}>
                        <div className={styles.top}>
                            <p className={styles.title}>{team.name}</p>
                            <div className={styles.sub_box}>
                                <div className={styles.teacher_box}>
                                    {team.teacherArray.map((teacher, idx) => (
                                        <span key={idx} >{teacher.name}</span>
                                    ))}
                                </div>
                                <div className={styles.day_box}>
                                    {team.dayArray.map((days, idx) => (
                                        <span data-day={days.name} className={styles.day} key={idx} >{days.name.slice(0, 1)}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.link_box}>
                                {team.instagram ? <a href={team.instagram} alt="인스타그램" title={team.name} target="_blank">인스타그램 <img src="/icons/link_24px.png" /></a> : ""}
                            </div>
                        </div>
                        <ul className={styles.bottom}>
                            {team.recruitmentArray.filter(recruit => recruit.dday !== '종료').length > 0 ? team.recruitmentArray.filter(recruit => recruit.dday !== '종료').map((list, idx) => (
                                <li className={styles.recruit} key={idx}>
                                    <div className={styles.recruit_top}>
                                        <span className={styles.recruit_title}>{list.name}</span>
                                    </div>
                                    <div className={styles.recruit_bottom}>
                                        <span className={styles.recruit_dday}>{list.dday}</span>
                                        <span className={styles.recruit_start_date}>{list.start_date}</span>
                                    </div>
                                    <a className={styles.recruit_link} href={list.url} target="_blank">신청링크 <img src="/icons/link_24px.png" /></a>
                                </li>
                            )) : <li className={styles.recruit_not}>최근 신청 모집 게시글이 없습니다.</li>}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}
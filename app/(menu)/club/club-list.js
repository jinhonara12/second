// import fetchData from '../../lib/database/club';
import data from '../../lib/static_database/club';
import styles from './page.module.scss';

export default async function ClubData() {
    // const data = await fetchData();

    return (
        <div className={styles.club_data_box}>
            <ul className={styles.data_ul}>
                {data.map((club, index) => (
                    <li className={styles.li} key={index}>
                        <div className={styles.main_box}>
                            <div className={styles.title_box}>
                                <p className={styles.title}> {club.name}</p>
                            </div>
                            <div className={styles.sub_text}>
                                <p className={styles.p}>{club.address}</p>
                                {club.address && <p className={styles.p}><a href={`https://map.naver.com/p/search/${club.address}`} target="_blank">(지도 링크<img src="/icons/link_24px.png" />)</a></p>}
                            </div>
                        </div>

                        <div className={styles.bottom}>
                            <div className={styles.link_box}>
                                {club.facebook && <p className={styles.link}> <a href={club.facebook} title="페이스북 바로가기" target="_blank">페이스북<img src="/icons/link_24px.png" /> </a></p>}
                                {club.instagram && <p className={styles.link}> <a href={club.instagram} title="인스타그램 바로가기" target="_blank">인스타그램<img src="/icons/link_24px.png" /> </a></p>}
                                {club.linktree && <p className={styles.link}> <a href={club.linktree} title="링크트리 바로가기" target="_blank">링크트리<img src="/icons/link_24px.png" /> </a></p>}
                                {club.cafe && <p className={styles.link}> <a href={club.cafe} title="카페 바로가기" target="_blank">카페<img src="/icons/link_24px.png" /> </a></p>}
                                {club.youtube1 && <p className={styles.link}> <a href={club.youtube1} title="유튜브 바로가기" target="_blank">유튜브<img src="/icons/link_24px.png" /> </a></p>}
                                {club.youtube2 && <p className={styles.link}> <a href={club.youtube2} title="유튜브 바로가기" target="_blank">유튜브<img src="/icons/link_24px.png" /> </a></p>}
                                {club.homepage && <p className={styles.link}> <a href={club.homepage} title="홈페이지 바로가기" target="_blank">홈페이지<img src="/icons/link_24px.png" /> </a></p>}
                            </div>

                            <div className={styles.date_box}>
                                <div className={styles.heart_box}>
                                    <img src="/icons/heart_icon_red.png" />
                                    <span>{club.heart}개</span>
                                </div>
                                <p data-key={club.locaiton} className={styles.location}>{club.locaiton}</p>
                                <ul>
                                    {club.mainday.map((day, idx) => (
                                        <li key={idx} data-day={day.name}>{day.name.slice(0, 1)}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className={styles.bar}>
                            <ul className={styles.bar_box}>
                                <li>BAR</li>
                                {club.bar.map((item, idx) => (
                                    <li className={styles.item} key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
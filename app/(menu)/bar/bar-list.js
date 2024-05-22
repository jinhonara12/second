import fetchData from '../../lib/database/bar';
import { cache } from 'react';
import styles from './page.module.scss';

const cachedFetchData = cache(fetchData);


export default async function BarData() {
    // const data = await cachedFetchData();
    const data = await fetchData();

    return (
        <div className={styles.bar_data_box}>
            <ul className={styles.data_ul}>
                {data.map((bar, index) => (
                    <li className={styles.li} key={index}>
                        <div className={styles.main_box}>
                            <div className={styles.title_box}>
                                <p className={styles.title}> {bar.name}</p>
                            </div>
                            <div className={styles.sub_text}>
                                <p className={styles.p}>{bar.address}</p>
                                {bar.address && <p className={styles.p}><a href={`https://map.naver.com/p/search/${bar.address}`} target="_blank">(지도 링크<img src="/icons/link_24px.png" />)</a></p>}
                            </div>
                        </div>

                        <div className={styles.bottom}>
                            <div className={styles.date_box}>
                                <div className={styles.heart_box}>
                                    <img src="/icons/heart_icon_red.png" />
                                    <span>{bar.heart}개</span>
                                </div>
                                <p data-key={bar.locaiton} className={styles.location}>{bar.locaiton}</p>
                                <ul>
                                    {bar.socialArray.map((day, idx) => (
                                        <li key={idx} data-day={day.name}>{day.name.slice(0, 1)}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className={styles.bar}>
                            <ul className={styles.bar_box}>
                                <li>BAR</li>
                                {bar.club.map((item, idx) => (
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
import fetch from '../../lib/database/workshop-recuritment';
import styles from './page.module.scss';

// {
//     name: '나나씨‘s 프라이빗 스위블 클래스 in 서울',

//     start_date: '2024-05-13',
//     end_date: '2024-05-20',
//     dday: 'D-4',

//     url: 'https://forms.gle/9WMxuHqrV2fE7dme6',
//     check_url: null,

//     photo: 'https://prod-files-secure.s3.us-west-2.amazonaws.com/4c8dfa27-59ce-4f93-855c-c41107b371d7/493cdb20-304b-485f-832b-e83a47e5afe0/IMG_9486.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240509%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240509T030432Z&X-Amz-Expires=3600&X-Amz-Signature=2a2b5a81e03776f2230d2721b628bf9394081ecf1b6377c0181ae9801f2c012d&X-Amz-SignedHeaders=host&x-id=GetObject',

//     created_time: '2024-05-09T02:57:00.000Z',
//     last_modified_time: '2024-05-09T03:00:00.000Z'

//     creator_user: '공진호',
//     last_modifier_user: '공진호',
//   }

export default async function page() {
    const response = await fetch();

    return (
        <main className={styles.main}>
            <section className={styles.section}>
                <ul className={styles.list_box}>
                    {response.map((list, index) => {
                        return (
                            <li className={styles.list} key={index}>
                                <div className={styles.img_box}>
                                    {list.photo ? <img src={list.photo} loading="lazy" alt={list.name} /> : <div className={styles.no_img}></div>}
                                </div>
                                <div className={styles.title_box}>
                                    <h3>{list.name}</h3>
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
                                    {list.url ? <a href={list.url} target='_blank'>신청링크 <img src="/icons/link_24px.png" /></a> : ""}
                                    {list.check_url ? <a href={list.check_url} target='_blank'>확인링크 <img src="/icons/link_24px.png" /></a> : ""}
                                </div>
                                <div className={styles.created_date}>
                                    <span>수정일 | {list.last_modified_time.split('T')[0]}</span>
                                    <span>작성일 | {list.created_time.split('T')[0]}</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}
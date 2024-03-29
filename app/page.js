import styles from './page.module.scss';
import Link from 'next/link';
import recentlyNewsData from './recentlyNewsData.js';


function RecentlyNews({ className }) {
  return (
    <div className={className}>
      <div>
        <h4>recently news</h4>
        <span>최신 모집글</span>
      </div>
      <ul>
        <li>
          <a href="" title="타이틀" target="_blank">
            <div className={styles.top}>
              <p>
                <span>new</span>
                Camp Swing It 2024
              </p>
            </div>
            <div className={styles.middle}>
              <span className={styles.date}>2024년 4월 5일 - 2024년 4월 7일</span>
              <span className={styles.dday}>D-2</span>
            </div>
            <div className={styles.bottom}>
              <span className={styles.writer}>장롱</span>
              <span className={styles.date}>2024년 3월 28일 오후 3:00</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  )
}

function MainNews({ className }) {
  return (
    <div className={className}>
      <div className={styles.image_box}>
        <img src="/images/Lindbergh_610.webp" />
      </div>
      <div className={styles.text_box}>
        <div className={styles.title}>
          <span className={styles.en}>Charles Lindbergh Successfully Crosses the Atlantic Solo!</span>
        </div>
        <div className={styles.text}>
          <span className={styles.en}>New York, May 20, 1927 - The brave American aviator Charles Lindbergh successfully crossed the Atlantic solo aboard the single-engine aircraft 'Spirit of St. Louis'. After a long 33-hour and 30-minute flight, he safely landed at Le Bourget Aerodrome in Paris on May 21, 1927....<Link href="/about" title="about페이지로 이동">more</Link></span>
        </div>
        <div className={styles.sub}>
          <span>from Chat GPT 3.5</span>
        </div>
      </div>

    </div >
  )
}

export default function Home() {
  return (
    <main className={styles.main}>
      <RecentlyNews className={styles.recently_news_box} />
      <MainNews className={styles.main_news} />
    </main>
  )
}

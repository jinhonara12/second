import styles from './page.module.scss';
import Link from 'next/link';
import NewsData from './newsData';
import { Suspense } from 'react';
import Loading from '../(component)/Loading';

function WeeklyNews({ className }) {
  return (
    <div className={className}>
      <div>
        <h4>weekly news</h4>
        <span>- 7일 이내 모집 마감 게시글</span>
      </div>
      <ul>
        <NewsData type="weekly" />
      </ul>
    </div>
  )
}

function RecentlyNews({ className }) {
  return (
    <div className={className}>
      <div>
        <h4>recently news</h4>
        <span>- 최근 업로드 게시글</span>
      </div>
      <ul>
        <NewsData type="recent" />
      </ul>
    </div>
  )
}

function MainNews({ className }) {
  return (
    <div className={className}>
      <div className={styles.image_box}>
        <img src="/image/Lindbergh_610.webp" alt='Charles Lindbergh Successfully Crosses the Atlantic Solo!' />
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
      <div className={styles.sorted_news}>
        <Suspense fallback={<Loading text="Weekly News" />}>
          <WeeklyNews className={styles.weekly_news_box} />
        </Suspense>
        <Suspense fallback={<Loading text="Recently News" />}>
          <RecentlyNews className={styles.recently_news_box} />
        </Suspense>
      </div>
      <MainNews className={styles.main_news} />
    </main>
  )
}

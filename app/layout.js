import Header from './(header)/header';
import SideNav from './(header)/sideNav';
import Footer from './(footer)/Footer'
import { Roboto_Slab } from 'next/font/google';
import styles from './layout.module.scss';
import './reset.css';
import './global.scss';

export const dynamic = 'force-dynamic';

const roboto = Roboto_Slab({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export const metadata = {
  title: {
    template: 'Daily Swing | %s',
    default: 'Daily Swing | 홈페이지',
  },
  description: "스윙 커뮤니티 데일리스윙입니다. 스윙댄스를 시작하는 뉴비를 위해 다양한 행사와 강습, 정보를 손쉽게 확인할 수 있습니다.",
  keywords: '스윙댄스,스윙라이프,스윙재즈,직장인취미,취미생활,커플댄스,소셜댄스,댄스',
  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: 'Daily Swing',
    site_name: '데일리스윙',
    description: "스윙 커뮤니티 데일리스윙입니다. 스윙댄스를 시작하는 뉴비를 위해 다양한 행사와 강습, 정보를 손쉽게 확인할 수 있습니다.",
    url: 'https://daily-swing.com',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={roboto.className}>
      <body className={styles.body}>
        <Header />
        <div className={styles.main__section}>
          <SideNav />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

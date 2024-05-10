import Header from './(header)/header';
import SideNav from './(header)/sideNav'
import { Roboto_Slab } from 'next/font/google';
import styles from './layout.module.scss';
import './reset.css';
import './global.scss';


const roboto = Roboto_Slab({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export const metadata = {
  title: "Daily Swing | 홈",
  description: "홈페이지",
  keywords: 'a,b,c',

  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    type: 'article',
    publishedTime: '2023-01-01T00:00:00.000Z',
    authors: ['Seb', 'Josh']
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
      </body>
    </html>
  );
}

import Header from './header';
import SideNav from './sideNav'
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
  title: "Swing Daily",
  description: "",
};

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

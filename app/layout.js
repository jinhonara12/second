import Header from './header';
import { Roboto_Slab } from 'next/font/google';
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
      <body >
        <Header />
        {children}
      </body>
    </html>
  );
}

import Header from './header'

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body >
        <Header />
        {children}
      </body>
    </html>
  );
}

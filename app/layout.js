import "./globals.css";

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body >{children}</body>
    </html>
  );
}

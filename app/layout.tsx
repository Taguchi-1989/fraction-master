import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "分数マスター - 楽しく学べる分数ゲーム",
  description: "小学生向けの分数学習ゲーム。視覚的に分数を理解できます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} font-sans antialiased bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

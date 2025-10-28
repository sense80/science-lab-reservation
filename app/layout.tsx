import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "대전관저고 과학실 예약시스템",
  description: "과학실 예약 및 관리 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}


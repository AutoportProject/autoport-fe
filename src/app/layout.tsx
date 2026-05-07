import localFont from "next/font/local";
import { Archivo_Black } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Header from "@/components/layout/Header";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.ttf",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo-black",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${archivoBlack.variable}`}>
      <body className="font-pretendard antialiased">
        <Header />
        {children}
        <footer className="fixed bottom-0 left-0 px-6 py-4">
          <Link
            href="/terms"
            className="caption-m-lg text-[#525252] cursor-pointer hover:underline"
          >
            이용 약관
          </Link>
        </footer>
      </body>
    </html>
  );
}
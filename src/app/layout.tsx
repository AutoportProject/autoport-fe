import localFont from 'next/font/local'
import { Archivo_Black } from 'next/font/google'
import Link from 'next/link'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

import './globals.css'

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.ttf',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-archivo-black',
})

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${archivoBlack.variable}`}
    >
      <body className="font-pretendard min-h-screen antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  )
}

export default RootLayout
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Logo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsLoggedIn(!!token)
  }, [pathname])

  return (
    <Link href={isLoggedIn ? '/home' : '/'} className="flex items-center gap-2">
      <Image src="/logo.svg" alt="로고" width={36} height={36} style={{ width: 'auto', height: '36px' }} />
      <span className="font-archivo-black tracking-[-0.05em] text-[#1C3154]">
        AutoPort
      </span>
    </Link>
  )
}
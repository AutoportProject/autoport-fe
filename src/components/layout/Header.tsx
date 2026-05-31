'use client'

import Logo from '@/components/layout/Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsLoggedIn(!!token)
  }, [pathname])

  function handleLogout() {
    localStorage.clear()
    router.push('/login')
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <Logo />
      <div className="flex gap-2">
        {isLoggedIn ? (
          <>
            <Button asChild variant="primary" size="sm">
              <Link href="/home/my">마이페이지</Link>
            </Button>
            <Button variant="primaryOutline" size="sm" onClick={handleLogout}>
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button asChild variant="primary" size="sm">
              <Link href="/login">로그인</Link>
            </Button>
            <Button asChild variant="primaryOutline" size="sm">
              <Link href="/signup">회원가입</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
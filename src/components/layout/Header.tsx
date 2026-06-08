import Logo from '@/components/layout/Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <Logo />
      <div className="flex gap-2">
        <Button asChild variant="primary" size="sm">
          <Link href="/login">로그인</Link>
        </Button>
        <Button asChild variant="primaryOutline" size="sm">
          <Link href="/signup">회원가입</Link>
        </Button>
      </div>
    </header>
  )
}
'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Header() {
  const router = useRouter()

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
        <Image src="/logo.svg" alt="로고" width={36} height={36} />
        <span style={{ fontFamily: 'var(--font-archivo-black)' }} className="tracking-[-0.05em] text-[#1C3154]">
          AutoPort
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => router.push('/login')}
          className="bg-blue-500 text-white px-3 py-1.5 rounded-[5px] text-sm"
        >
          로그인
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="border border-blue-500 text-blue-500 bg-white px-3 py-1.5 rounded-[5px] text-sm"
        >
          회원가입
        </button>
      </div>
    </header>
  )
}
'use client'

import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  return (
    <header className="flex items-center justify-end px-6 py-4 border-b">
      <div className="flex gap-2">
        <button
          onClick={() => router.push('/login')}
          className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md body-m"
        >
          로그인
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md body-m"
        >
          회원가입
        </button>
      </div>
    </header>
  )
}
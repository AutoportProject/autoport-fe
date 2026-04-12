'use client'

import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'

export default function SignupComplete() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-1 gap-3">
        <h1 className="title-bold">회원가입이 완료되었습니다!</h1>
        <img src="/octopus.png" alt="완료" className="w-32 h-32 object-contain" />
        <button
          onClick={() => router.push('/')}
          className="bg-blue-500 text-white py-3 px-6 rounded-md body-m"
        >
          포트폴리오 만들러 가기
        </button>
      </div>
    </div>
  )
}
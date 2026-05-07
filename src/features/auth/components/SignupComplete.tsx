'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SignupComplete() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center justify-center flex-1 gap-4">
        <h1 className="title-bold">회원가입이 완료되었습니다!</h1>
        <Image src="/octopus.svg" alt="완료" width={400} height={400} />
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
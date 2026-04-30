'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'

export default function EmailSignupForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="title-bold mb-8">이메일로 회원가입</h1>
        <div className="flex flex-col gap-4 w-80">
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
            />
            <button className="bg-blue-500 text-white px-3 py-2 rounded-md whitespace-nowrap">
              인증번호 전송
            </button>
          </div>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
          />
          <button
            onClick={() => router.push('/signup/info')}
            className="bg-blue-500 text-white py-3 rounded-md body-m"
          >
            다음으로
          </button>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'

export default function AdditionalInfoForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="title-bold mb-8">추가 정보 입력</h1>
        <div className="flex flex-col gap-4 w-80">
          <input
            type="text"
            placeholder="닉네임"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
          />
          <input
            type="text"
            placeholder="한줄소개"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
          />
          <button
            onClick={() => router.push('/signup/complete')}
            className="bg-blue-500 text-white py-3 rounded-md body-m"
          >
            회원가입 완료
          </button>
        </div>
      </div>
    </div>
  )
}
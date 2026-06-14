'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { oauthSignup } from '@/lib/api/auth'
import FormInput from '@/components/ui/FormInput'

export default function GithubSignupForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const tempUserId = sessionStorage.getItem('tempUserId')
    if (!tempUserId) {
      alert('다시 시도해주세요!')
      router.push('/signup')
      return
    }
    const res = await oauthSignup({ tempUserId: Number(tempUserId), name, bio })
    if (res.success) {
      sessionStorage.removeItem('tempUserId')
      localStorage.setItem('accessToken', res.data.accessToken)
      router.push('/signup/complete')
    } else {
      alert('회원가입에 실패했습니다!')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="title-bold mb-8">추가 정보 입력</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-4 w-80">
        <FormInput
          type="text"
          placeholder="닉네임 (포트폴리오 이름)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          type="text"
          placeholder="한줄소개"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-md body-m"
        >
          회원가입 완료
        </button>
      </form>
    </div>
  )
}
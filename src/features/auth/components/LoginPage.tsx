'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { localLogin } from '@/lib/api/auth'
import FormInput from '@/components/ui/FormInput'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await localLogin({ email, password })
    if (res.success) {
      localStorage.setItem('accessToken', res.data.accessToken)
      router.push('/home')
    } else {
      alert('이메일 또는 비밀번호가 올바르지 않습니다!')
    }
  }

  const handleGithubLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
    const redirectUri = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/github/callback`
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user,repo`
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1 className="title-bold">로그인</h1>
      <div className="flex flex-col gap-4 w-80">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <FormInput
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-md body-m"
          >
            로그인
          </button>
        </form>
        <button
          onClick={handleGithubLogin}
          className="bg-gray-800 text-white py-3 rounded-md body-m flex items-center justify-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub 계정으로 로그인
        </button>
      </div>
    </div>
  )
}
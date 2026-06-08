'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { githubLogin } from '@/lib/api/auth'

const REDIRECT_URI = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/github/callback`

function GithubCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) {
      router.push('/')
      return
    }

    githubLogin({ code, redirectUri: REDIRECT_URI }).then((res) => {
      if (res.success) {
        if (res.data.isNewUser) {
          sessionStorage.setItem('tempUserId', String(res.data.tempUserId))
          router.push('/signup/info')
        } else {
          sessionStorage.removeItem('tempUserId')
          localStorage.setItem('accessToken', res.data.accessToken)
          router.push('/')
        }
      } else {
        alert('GitHub 로그인에 실패했습니다!')
        router.push('/login')
      }
    })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="body-m">처리 중...</p>
    </div>
  )
}

export default function GithubCallbackPage() {
  return (
    <Suspense>
      <GithubCallbackContent />
    </Suspense>
  )
}
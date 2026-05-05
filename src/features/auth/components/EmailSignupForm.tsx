'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sendVerificationEmail } from '@/lib/api/auth'
import FormInput from '@/components/ui/FormInput'

export default function EmailSignupForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [codeVerified, setCodeVerified] = useState(false)

  const handleSendCode = async () => {
    if (!email) {
      alert('이메일을 입력해주세요!')
      return
    }
    const res = await sendVerificationEmail(email)
    if (res.success) {
      setCodeSent(true)
      alert('인증번호가 전송되었습니다!')
    } else {
      alert(res.data?.message || '이미 가입된 이메일입니다!')
    }
  }

  const handleVerifyCode = () => {
    if (code.length > 0) {
      setCodeVerified(true)
      alert('인증번호가 확인되었습니다!')
    } else {
      alert('인증번호를 입력해주세요!')
    }
  }

  const handleNext = () => {
    if (!codeVerified) {
      alert('이메일 인증을 완료해주세요!')
      return
    }
    if (!password || !passwordConfirm) {
      alert('비밀번호를 입력해주세요!')
      return
    }
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다!')
      return
    }
    sessionStorage.setItem('signupData', JSON.stringify({ email, password, code }))
    router.push('/signup/info')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="title-bold mb-8">이메일로 회원가입</h1>
        <div className="flex flex-col gap-4 w-80">
          <div className="flex gap-2">
            <FormInput
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="button"
              onClick={handleSendCode}
              className="bg-blue-500 text-white px-3 py-2 rounded-md whitespace-nowrap"
            >
              인증번호 전송
            </button>
          </div>
          {codeSent && (
            <div className="flex gap-2">
              <FormInput
                type="text"
                placeholder="인증번호"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                type="button"
                onClick={handleVerifyCode}
                className="bg-blue-500 text-white px-3 py-2 rounded-md whitespace-nowrap"
              >
                확인
              </button>
            </div>
          )}
          <FormInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <button
            type="button"
            onClick={handleNext}
            className="bg-blue-500 text-white py-3 rounded-md body-m"
          >
            다음으로
          </button>
        </div>
      </div>
    </div>
  )
}
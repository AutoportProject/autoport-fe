'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserMe } from '@/hooks/useUserMe'
import { useGeneratePortfolio } from '@/hooks/useGeneratePortfolio'

const EmphasisPage = () => {
  const [emphasis, setEmphasis] = useState('')
  const { user } = useUserMe()
  const { isLoading, error, generate } = useGeneratePortfolio()
  const router = useRouter()

  const handleNext = async () => {
    if (!user) return
    await generate(emphasis, user.name)
  }

  return (
    <div className="flex w-full flex-col items-center gap-8 px-6 py-12">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="title-bold text-neutral-950">
          프로젝트에서
          <br />
          강조하고 싶은 부분을 입력해 주세요
        </h1>
      </div>

      <div className="w-full max-w-xl rounded-2xl border border-neutral-200 p-6">
        <textarea
          value={emphasis}
          onChange={(e) => setEmphasis(e.target.value)}
          placeholder="예) 성능 최적화를 위해 캐싱 전략을 도입했고, API 응답 속도를 50% 개선했습니다."
          className="body-m h-52 w-full resize-none bg-transparent text-neutral-800 placeholder:text-neutral-300 focus:outline-none"
        />

        {error && (
          <p className="caption-m-sm mt-2 text-red-500">{error}</p>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleNext}
            disabled={isLoading || !user}
            className="body-sb rounded-xl bg-neutral-200 px-6 py-2.5 text-neutral-700 transition-all hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLoading ? '생성 중...' : '다음'}
          </button>
        </div>
      </div>

      <button
        onClick={() => router.back()}
        className="caption-m-sm text-neutral-400 underline underline-offset-4"
      >
        이전으로
      </button>
    </div>
  )
}

export default EmphasisPage
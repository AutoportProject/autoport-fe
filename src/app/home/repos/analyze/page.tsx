'use client'

import { useRepoStore } from '@/store/repoStore'
import { useRouter } from 'next/navigation'

const AnalyzePage = () => {
  const { analyzeResult } = useRepoStore()
  const router = useRouter()

  if (!analyzeResult) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <p className="body-m text-neutral-400">분석 결과가 없습니다.</p>
        <button
          onClick={() => router.push('/home/repos')}
          className="caption-m-sm text-neutral-500 underline underline-offset-4"
        >
          레포지토리 선택으로 돌아가기
        </button>
      </div>
    )
  }

  const { aiInputData } = analyzeResult

  return (
    <div className="flex w-full flex-col items-center gap-10 px-6 py-12">
      {/* 헤더 */}
      <div className="flex w-full max-w-2xl flex-col gap-1">
        <span className="caption-m-sm text-neutral-400">분석 완료</span>
        <h1 className="title-bold text-neutral-950">{analyzeResult.repoName}</h1>
        {analyzeResult.description && (
          <p className="body-m text-neutral-500">{analyzeResult.description}</p>
        )}
      </div>

      <div className="flex w-full max-w-2xl flex-col gap-4">
        {/* 요약 */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <span className="caption-m-sm text-neutral-400">프로젝트 요약</span>
          <p className="body-m mt-2 leading-relaxed text-neutral-700">{aiInputData.summary}</p>
        </div>

        {/* 스탯 */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1 rounded-2xl border border-neutral-200 p-5">
            <span className="caption-m-sm text-neutral-400">커밋 수</span>
            <span className="title-bold text-neutral-950">{analyzeResult.commitCount.toLocaleString()}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-2xl border border-neutral-200 p-5">
            <span className="caption-m-sm text-neutral-400">스타</span>
            <span className="title-bold text-neutral-950">{analyzeResult.starCount.toLocaleString()}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-2xl border border-neutral-200 p-5">
            <span className="caption-m-sm text-neutral-400">중요도 점수</span>
            <span className="title-bold text-neutral-950">{analyzeResult.importanceScore}</span>
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="rounded-2xl border border-neutral-200 p-6">
          <span className="caption-m-sm text-neutral-400">기술 스택</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {analyzeResult.techStacks.map((stack) => (
              <span
                key={stack}
                className="caption-m-sm rounded-full bg-neutral-900 px-3 py-1.5 text-white"
              >
                {stack}
              </span>
            ))}
          </div>
        </div>

        {/* 주요 특징 */}
        {aiInputData.highlights.length > 0 && (
          <div className="rounded-2xl border border-neutral-200 p-6">
            <span className="caption-m-sm text-neutral-400">주요 특징</span>
            <ul className="mt-3 flex flex-col gap-2">
              {aiInputData.highlights.map((highlight, i) => (
                <li key={i} className="body-m flex gap-2 text-neutral-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* README 요약 */}
        {analyzeResult.readmeSummary && (
          <div className="rounded-2xl border border-neutral-200 p-6">
            <span className="caption-m-sm text-neutral-400">README 요약</span>
            <p className="body-m mt-2 leading-relaxed text-neutral-700">{analyzeResult.readmeSummary}</p>
          </div>
        )}

        {/* 활동 요약 */}
        {analyzeResult.activitySummary && (
          <div className="rounded-2xl border border-neutral-200 p-6">
            <span className="caption-m-sm text-neutral-400">활동 요약</span>
            <p className="body-m mt-2 leading-relaxed text-neutral-700">{analyzeResult.activitySummary}</p>
          </div>
        )}

        {/* 개발 기간 / 주요 언어 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-neutral-200 p-5">
            <span className="caption-m-sm text-neutral-400">개발 기간</span>
            <p className="body-sb mt-1 text-neutral-800">{aiInputData.developmentPeriod}</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 p-5">
            <span className="caption-m-sm text-neutral-400">주요 언어</span>
            <p className="body-sb mt-1 text-neutral-800">{analyzeResult.mainLanguage}</p>
          </div>
        </div>

        {/* 최근 커밋 */}
        {aiInputData.recentCommitMessages.length > 0 && (
          <div className="rounded-2xl border border-neutral-200 p-6">
            <span className="caption-m-sm text-neutral-400">최근 커밋</span>
            <ul className="mt-3 flex flex-col gap-2">
              {aiInputData.recentCommitMessages.slice(0, 5).map((msg, i) => (
                <li key={i} className="caption-m-sm flex gap-3 text-neutral-500">
                  <span className="shrink-0 text-neutral-300">{String(i + 1).padStart(2, '0')}</span>
                  <span className="truncate">{msg}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="flex w-full max-w-2xl flex-col items-center gap-3">
        <button
          onClick={() => router.push('/next-step')} // 다음 step 경로 확정 시 수정
          className="body-sb w-full rounded-2xl bg-neutral-900 py-5 text-white transition-all hover:bg-neutral-800"
        >
          포트폴리오 생성하기
        </button>
        <button
          onClick={() => router.push('/home/repos/analyze/emphasis')}
          className="caption-m-sm text-neutral-400 underline underline-offset-4"
        >
          다른 레포지토리 선택
        </button>
      </div>
    </div>
  )
}

export default AnalyzePage
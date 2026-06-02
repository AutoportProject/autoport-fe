'use client'

import { useRepoStore } from '@/store/repoStore'
import { useRouter } from 'next/navigation'

const PortfolioPage = () => {
  const { portfolioResult, savedPortfolioId } = useRepoStore()
  const router = useRouter()

  if (!portfolioResult) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <p className="body-m text-neutral-400">포트폴리오 결과가 없습니다.</p>
        <button
          onClick={() => router.push('/home')}
          className="caption-m-sm text-neutral-500 underline underline-offset-4"
        >
          처음으로 돌아가기
        </button>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center gap-10 px-6 py-12">
      {/* 헤더 */}
      <div className="flex w-full max-w-2xl flex-col gap-1">
        <span className="caption-m-sm text-neutral-400">포트폴리오 생성 완료</span>
        <h1 className="title-bold text-neutral-950">{portfolioResult.portfolioTitle}</h1>
        <p className="body-m text-neutral-500">{portfolioResult.introduction}</p>
      </div>

      <div className="flex w-full max-w-2xl flex-col gap-4">
        {/* 프로젝트 */}
        {portfolioResult.projects.map((project, i) => (
          <div key={i} className="flex flex-col gap-4 rounded-2xl border border-neutral-200 p-6">
            <div className="flex flex-col gap-1">
              <span className="caption-m-sm text-neutral-400">프로젝트</span>
              <h2 className="body-sb text-neutral-950">{project.name}</h2>
              <p className="body-m text-neutral-500">{project.oneLineDescription}</p>
            </div>

            <p className="body-m leading-relaxed text-neutral-700">{project.description}</p>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-neutral-50 p-4">
                <span className="caption-m-sm text-neutral-400">개발 기간</span>
                <p className="body-m mt-1 text-neutral-700">{project.estimatedPeriod}</p>
              </div>
              <div className="rounded-xl bg-neutral-50 p-4">
                <span className="caption-m-sm text-neutral-400">역할</span>
                <p className="body-m mt-1 text-neutral-700">{project.role}</p>
              </div>
            </div>

            {/* 기술 스택 */}
            <div>
              <span className="caption-m-sm text-neutral-400">기술 스택</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.techStacks.map((stack) => (
                  <span key={stack} className="caption-m-sm rounded-full bg-neutral-900 px-3 py-1.5 text-white">
                    {stack}
                  </span>
                ))}
              </div>
            </div>

            {/* 주요 기능 */}
            {project.mainFeatures.length > 0 && (
              <div>
                <span className="caption-m-sm text-neutral-400">주요 기능</span>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {project.mainFeatures.map((feature, j) => (
                    <li key={j} className="body-m flex gap-2 text-neutral-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 하이라이트 */}
            {project.highlights.length > 0 && (
              <div>
                <span className="caption-m-sm text-neutral-400">하이라이트</span>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {project.highlights.map((highlight, j) => (
                    <li key={j} className="body-m flex gap-2 text-neutral-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {/* 기술 기여 */}
        {portfolioResult.technicalContributions.length > 0 && (
          <div className="rounded-2xl border border-neutral-200 p-6">
            <span className="caption-m-sm text-neutral-400">기술적 기여</span>
            <ul className="mt-3 flex flex-col gap-2">
              {portfolioResult.technicalContributions.map((item, i) => (
                <li key={i} className="body-m flex gap-2 text-neutral-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 코드 하이라이트 */}
        {portfolioResult.codeHighlights.length > 0 && (
          <div className="rounded-2xl border border-neutral-200 p-6">
            <span className="caption-m-sm text-neutral-400">코드 하이라이트</span>
            <ul className="mt-3 flex flex-col gap-2">
              {portfolioResult.codeHighlights.map((item, i) => (
                <li key={i} className="caption-m-sm flex gap-3 text-neutral-500">
                  <span className="shrink-0 text-neutral-300">{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 프로젝트 링크 */}
        {portfolioResult.projectLinks.length > 0 && (
          <div className="rounded-2xl border border-neutral-200 p-6">
            <span className="caption-m-sm text-neutral-400">프로젝트 링크</span>
            <ul className="mt-3 flex flex-col gap-2">
              {portfolioResult.projectLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="body-m text-neutral-700 underline underline-offset-4 hover:text-neutral-950"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="flex w-full max-w-2xl flex-col gap-3">
        {savedPortfolioId && (
        <button
          onClick={() => router.push(`/portfolio/${savedPortfolioId}/edit`)}
          className="body-sb w-full rounded-2xl border border-neutral-900 py-5 text-neutral-900 transition-all hover:bg-neutral-50"
        >
          수정하기
        </button>
      )}
      <button
        onClick={() => router.push('/home/my')}
        className="body-sb w-full rounded-2xl bg-neutral-900 py-5 text-white transition-all hover:bg-neutral-800"
      >
        내 포트폴리오 보러가기
      </button>
    </div>
    </div>
  )
}

export default PortfolioPage
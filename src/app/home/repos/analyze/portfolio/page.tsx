'use client'

import PortfolioPreview, {
  type PortfolioPreviewData,
} from '@/features/portfolio/components/PortfolioPreview'
import { useRepoStore } from '@/store/repoStore'
import { useRouter } from 'next/navigation'

const PortfolioPage = () => {
  const { analyzeResult, portfolioResult, savedPortfolioId } = useRepoStore()
  const router = useRouter()

  if (!portfolioResult) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <p className="body-m text-neutral-400">포트폴리오 결과가 없어요.</p>
        <button
          onClick={() => router.push('/home')}
          className="caption-m-sm text-neutral-500 underline underline-offset-4"
        >
          처음으로 돌아가기
        </button>
      </div>
    )
  }

  const previewPortfolio: PortfolioPreviewData = {
    title: portfolioResult.portfolioTitle,
    bio: portfolioResult.introduction,
    summary: portfolioResult.summary,
    description: portfolioResult.description,
    createdAt: portfolioResult.generatedAt,
    updatedAt: portfolioResult.generatedAt,
    isPublic: false,
    projects: portfolioResult.projects.map((project, index) => ({
      repoId: analyzeResult?.repoId ?? index,
      name: project.name,
      description: project.description || project.oneLineDescription,
      techStacks: project.techStacks,
      highlights: project.highlights.length > 0 ? project.highlights : project.mainFeatures,
      githubUrl: analyzeResult?.aiInputData.repoUrl,
      deployUrl: portfolioResult.projectLinks[index],
      order: index + 1,
    })),
  }

  return (
    <div className="flex w-full flex-col items-center gap-8 px-6 py-12">
      <div className="flex w-full max-w-4xl flex-col gap-6">
        <PortfolioPreview portfolio={previewPortfolio} eyebrow="포트폴리오 생성 완료" />

        <div className="flex w-full flex-col gap-3">
          {savedPortfolioId && (
            <button
              onClick={() => router.push(`/portfolio/${savedPortfolioId}/edit`)}
              className="body-sb w-full rounded-lg border border-neutral-900 py-4 text-neutral-900 transition-all hover:bg-neutral-50"
            >
              수정하기
            </button>
          )}
          <button
            onClick={() => router.push('/home/my')}
            className="body-sb w-full rounded-lg bg-neutral-900 py-4 text-white transition-all hover:bg-neutral-800"
          >
            내 포트폴리오 보러가기
          </button>
        </div>
      </div>
    </div>
  )
}

export default PortfolioPage

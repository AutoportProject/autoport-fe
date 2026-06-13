'use client'

import { useParams } from 'next/navigation'
import PortfolioPreview from '@/features/portfolio/components/PortfolioPreview'
import { useSharedPortfolio } from '@/hooks/usePortfolioDetail'

const SharedPortfolioPage = () => {
  const params = useParams<{ shareToken: string }>()
  const shareToken = params.shareToken
  const { portfolio, isLoading, error } = useSharedPortfolio(shareToken)

  if (isLoading) {
    return (
      <div className="flex w-full justify-center self-start px-6 py-10">
        <div className="flex w-full max-w-4xl flex-col gap-4 self-start">
          <div className="h-8 w-36 animate-pulse rounded bg-neutral-100" />
          <div className="h-44 animate-pulse rounded-lg bg-neutral-100" />
          <div className="h-72 animate-pulse rounded-lg bg-neutral-100" />
        </div>
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 self-start px-6 py-20 text-center">
        <p className="body-m text-neutral-500">
          {error ?? '포트폴리오를 불러올 수 없어요.'}
        </p>
      </div>
    )
  }

  return (
    <div className="flex w-full justify-center self-start px-6 py-10">
      <div className="flex w-full max-w-4xl flex-col gap-6 self-start">
        <PortfolioPreview portfolio={portfolio} eyebrow="공유된 포트폴리오" />
      </div>
    </div>
  )
}

export default SharedPortfolioPage

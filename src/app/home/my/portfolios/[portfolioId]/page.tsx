'use client'

import { useState } from 'react'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import PortfolioPreview from '@/features/portfolio/components/PortfolioPreview'
import { usePortfolioDetail } from '@/hooks/usePortfolioDetail'
import { useDeletePortfolio } from '@/hooks/usePortfolio'

function DeleteModal({
  title,
  onConfirm,
  onCancel,
  loading,
}: {
  title: string
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4">
        <h3 className="body-sb text-neutral-950 mb-2">포트폴리오 삭제</h3>
        <p className="body-m text-neutral-500 mb-6">
          <span className="text-neutral-700">&ldquo;{title}&rdquo;</span>을(를) 삭제할까요?{' '}
          삭제 후에는 복구할 수 없습니다.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="body-m px-4 py-2 text-neutral-600 bg-neutral-100 rounded-xl hover:bg-neutral-200 transition disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="body-m px-4 py-2 text-white bg-red-500 rounded-xl hover:bg-red-600 transition disabled:opacity-50"
          >
            {loading ? '삭제 중...' : '삭제'}
          </button>
        </div>
      </div>
    </div>
  )
}

const PortfolioDetailPage = () => {
  const params = useParams<{ portfolioId: string }>()
  const portfolioId = params.portfolioId
  const router = useRouter()
  const { portfolio, isLoading, error } = usePortfolioDetail(portfolioId)
  const { remove, loading: deleting } = useDeletePortfolio()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  async function handleDelete() {
    try {
      await remove(Number(portfolioId))
      router.push('/home/my')
    } catch {
      setIsDeleteModalOpen(false)
    }
  }

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
        <Button asChild variant="outline" className="h-10 rounded-lg px-4">
          <Link href="/home/my">목록으로 돌아가기</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex w-full justify-center self-start px-6 py-10">
      <div className="flex w-full max-w-4xl flex-col gap-6 self-start">
        <div className="flex items-center justify-between">
          <Button asChild variant="ghost" className="h-9 w-fit gap-2 rounded-lg px-2">
            <Link href="/home/my">
              <ArrowLeft size={16} />
              목록으로
            </Link>
          </Button>

          <div className="flex gap-2">
            <Button asChild variant="outline" className="h-9 gap-2 rounded-lg px-3">
              <Link href={`/portfolio/${portfolioId}/edit`}>
                <Pencil size={16} />
                편집
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-9 gap-2 rounded-lg px-3 text-red-500 hover:bg-red-50"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <Trash2 size={16} />
              삭제
            </Button>
          </div>
        </div>

        <PortfolioPreview portfolio={portfolio} />
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          title={portfolio.title}
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
          loading={deleting}
        />
      )}
    </div>
  )
}

export default PortfolioDetailPage

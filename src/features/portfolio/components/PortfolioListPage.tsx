'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePortfolioList, useDeletePortfolio } from '@/hooks/usePortfolio'
import type { PortfolioListItem } from '@/types/portfolio'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function DeleteModal({
  portfolio,
  onConfirm,
  onCancel,
  loading,
}: {
  portfolio: PortfolioListItem
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4">
        <h3 className="body-sb text-neutral-950 mb-2">포트폴리오 삭제</h3>
        <p className="body-m text-neutral-500 mb-6">
          <span className="text-neutral-700">&ldquo;{portfolio.title}&rdquo;</span>을(를) 삭제할까요?{' '}
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

function PortfolioCard({
  portfolio,
  onEdit,
  onDelete,
  onShare,
}: {
  portfolio: PortfolioListItem
  onEdit: () => void
  onDelete: () => void
  onShare: () => void
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="body-sb text-neutral-950">
            {portfolio.featuredProjectName ?? portfolio.title}
          </h2>
          {(portfolio.summary || portfolio.description) && (
            <p className="body-m text-neutral-500 line-clamp-2">
              {portfolio.summary || portfolio.description}
            </p>
          )}
          {portfolio.updatedAt && (
            <p className="caption-m-sm text-neutral-400">수정일 · {formatDate(portfolio.updatedAt)}</p>
          )}
        </div>
        <span
          className={`caption-m-sm shrink-0 rounded-full px-3 py-1 ${
            portfolio.isPublic
              ? 'bg-neutral-900 text-white'
              : 'bg-neutral-100 text-neutral-500'
          }`}
        >
          {portfolio.isPublic ? '공개' : '비공개'}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="body-m flex-1 rounded-xl border border-neutral-200 py-2.5 text-neutral-700 hover:bg-neutral-50 transition"
        >
          편집
        </button>
        <button
          onClick={onShare}
          disabled={!portfolio.isPublic}
          className="body-m flex-1 rounded-xl border border-neutral-200 py-2.5 text-neutral-700 hover:bg-neutral-50 transition disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed"
        >
          공유
        </button>
        <button
          onClick={onDelete}
          className="body-m flex-1 rounded-xl border border-red-100 py-2.5 text-red-400 hover:bg-red-50 transition"
        >
          삭제
        </button>
      </div>
    </div>
  )
}

export default function PortfolioListPage() {
  const router = useRouter()
  const { portfolios, loading, error, refetch } = usePortfolioList()
  const { remove, loading: deleting } = useDeletePortfolio()
  const [deleteTarget, setDeleteTarget] = useState<PortfolioListItem | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  function showToast(message: string) {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  async function handleShare(portfolioId: number) {
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://autoport-fe-git-develop.vercel.app'
    const url = `${baseUrl}/portfolio/${portfolioId}`
    try {
      await navigator.clipboard.writeText(url)
      showToast('링크가 복사되었습니다!')
    } catch {
      showToast('링크 복사에 실패했습니다.')
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    try {
      await remove(deleteTarget.portfolioId)
      setDeleteTarget(null)
      refetch()
    } catch {
      // 에러는 훅에서 관리
    }
  }

  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
        <p className="body-m text-neutral-400">포트폴리오 불러오는 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <p className="body-m text-neutral-400">{error}</p>
        <button
          onClick={refetch}
          className="caption-m-sm text-neutral-500 underline underline-offset-4"
        >
          다시 시도
        </button>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center gap-10 px-6 py-12">
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-neutral-900 px-6 py-3 text-white shadow-lg body-m">
          {toast}
        </div>
      )}

      <div className="flex w-full max-w-2xl flex-col gap-1">
        <h1 className="title-bold text-neutral-950">내 포트폴리오</h1>
        <p className="body-m text-neutral-500">{portfolios.length}개의 포트폴리오</p>
      </div>

      <div className="flex w-full max-w-2xl flex-col gap-4">
        {portfolios.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-20">
            <p className="body-m text-neutral-400">아직 포트폴리오가 없어요</p>
            <p className="caption-m-sm text-neutral-400">
              깃허브 레포를 분석해서 포트폴리오를 만들어보세요!
            </p>
          </div>
        ) : (
          portfolios.map((p) => (
            <PortfolioCard
              key={p.portfolioId}
              portfolio={p}
              onEdit={() => router.push(`/portfolio/${p.portfolioId}/edit`)}
              onDelete={() => setDeleteTarget(p)}
              onShare={() => handleShare(p.portfolioId)}
            />
          ))
        )}
      </div>

      {deleteTarget && (
        <DeleteModal
          portfolio={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}
    </div>
  )
}
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePortfolioList, useDeletePortfolio } from '@/hooks/usePortfolio'
import type { PortfolioListItem } from '@/types/portfolio'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
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
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">포트폴리오 삭제</h3>
        <p className="text-sm text-gray-500 mb-6">
          <span className="font-medium text-gray-700">&ldquo;{portfolio.title}&rdquo;</span>을(를){' '}
          삭제할까요? 삭제 후에는 복구할 수 없습니다.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
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
}: {
  portfolio: PortfolioListItem
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 text-base truncate">{portfolio.title}</h3>
          {portfolio.featuredProjectName && (
            <p className="text-sm text-gray-400 mt-0.5 truncate">
              대표 프로젝트 · {portfolio.featuredProjectName}
            </p>
          )}
        </div>
        <span
          className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
            portfolio.isPublic ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {portfolio.isPublic ? '공개' : '비공개'}
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-4">수정일 · {formatDate(portfolio.updatedAt)}</p>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="flex-1 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
        >
          편집
        </button>
        <button
          onClick={onDelete}
          className="flex-1 py-1.5 text-sm font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition"
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
          <span className="text-sm">포트폴리오 불러오는 중...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">내 포트폴리오</h1>
            <p className="text-sm text-gray-400 mt-1">{portfolios.length}개의 포트폴리오</p>
          </div>
        </div>

        {portfolios.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-1">아직 포트폴리오가 없어요</p>
            <p className="text-sm">깃허브 레포를 분석해서 포트폴리오를 만들어보세요!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolios.map((p) => (
              <PortfolioCard
                key={p.portfolioId}
                portfolio={p}
                onEdit={() => router.push(`/portfolio/${p.portfolioId}/edit`)}
                onDelete={() => setDeleteTarget(p)}
              />
            ))}
          </div>
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
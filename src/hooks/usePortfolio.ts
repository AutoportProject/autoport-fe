import { useState, useEffect, useCallback } from 'react'
import {
  fetchPortfolioList,
  fetchPortfolioDetail,
  updatePortfolio,
  deletePortfolio,
} from '@/lib/api/portfolio'
import type {
  Portfolio,
  PortfolioListItem,
  UpdatePortfolioRequest,
} from '@/types/portfolio'

// 포트폴리오 목록 조회
export function usePortfolioList() {
  const [portfolios, setPortfolios] = useState<PortfolioListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPortfolioList({ sort: 'updatedAt', direction: 'desc' })
      setPortfolios(Array.isArray(data) ? data : (data as any).content ?? [])
    } catch (e) {
      setError(e instanceof Error ? e.message : '오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { portfolios, loading, error, refetch: load }
}

// 포트폴리오 상세 조회
export function usePortfolioDetail(portfolioId: number | null) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async (id: number) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPortfolioDetail(id)
      setPortfolio(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : '오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (portfolioId !== null) load(portfolioId)
  }, [portfolioId, load])

  return { portfolio, loading, error }
}

// 포트폴리오 수정
export function useUpdatePortfolio() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = useCallback(async (portfolioId: number, body: UpdatePortfolioRequest) => {
    setLoading(true)
    setError(null)
    try {
      const result = await updatePortfolio(portfolioId, body)
      return result
    } catch (e) {
      setError(e instanceof Error ? e.message : '수정에 실패했습니다.')
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  return { update, loading, error }
}

// 포트폴리오 삭제
export function useDeletePortfolio() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const remove = useCallback(async (portfolioId: number) => {
    setLoading(true)
    setError(null)
    try {
      await deletePortfolio(portfolioId)
    } catch (e) {
      setError(e instanceof Error ? e.message : '삭제에 실패했습니다.')
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  return { remove, loading, error }
}
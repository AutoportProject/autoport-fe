'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import axiosInstance from '@/lib/api/axios'

export interface PortfolioProject {
  repoId: number | string
  name: string
  description: string
  techStacks: string[]
  highlights: string[]
  githubUrl?: string
  deployUrl?: string
  order: number
}

export interface PortfolioDetail {
  portfolioId: number | string
  title: string
  bio: string
  summary?: string
  description?: string
  templateId: number | string
  featuredProjectId?: number | string
  projects: PortfolioProject[]
  createdAt: string
  updatedAt: string
  isPublic: boolean
}

interface PortfolioDetailResponse {
  success: boolean
  data: PortfolioDetail
}

const usePortfolioFetch = (url: string | null, notFoundMessage: string) => {
  const [portfolio, setPortfolio] = useState<PortfolioDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!url) return

    const fetchPortfolio = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const { data } = await axiosInstance.get<PortfolioDetailResponse>(url)

        setPortfolio(data.data)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status
          if (status === 400) setError('인증이 만료되었어요. 다시 로그인해 주세요.')
          else if (status === 404) setError(notFoundMessage)
          else setError('포트폴리오 상세 정보를 불러오지 못했어요.')
        } else {
          setError('알 수 없는 오류가 발생했어요.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchPortfolio()
  }, [url, notFoundMessage])

  return { portfolio, isLoading, error }
}

export const usePortfolioDetail = (portfolioId: string) => {
  return usePortfolioFetch(
    portfolioId ? `/api/portfolio/${portfolioId}` : null,
    '포트폴리오를 찾을 수 없어요.',
  )
}

export const useSharedPortfolio = (shareToken: string) => {
  return usePortfolioFetch(
    shareToken ? `/api/portfolio/share/${shareToken}` : null,
    '공유된 포트폴리오를 찾을 수 없어요.',
  )
}

'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import axiosInstance from '@/lib/api/axios'

export interface PortfolioSummary {
  portfolioId: number | string
  title: string
  templateId: number | string
  featuredProjectName: string
  createdAt: string
  updatedAt: string
  isPublic: boolean
}

interface PortfolioListResponse {
  success: boolean
  data: {
    content: PortfolioSummary[]
    page: number
    perPage: number
    totalElements: number
    totalPages: number
  }
}

export const usePortfolios = () => {
  const [portfolios, setPortfolios] = useState<PortfolioSummary[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPortfolios = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const { data } = await axiosInstance.get<PortfolioListResponse>('/api/portfolio', {
          params: {
            page,
            perPage: 6,
            sort: 'createdAt',
            direction: 'desc',
          },
        })

        setPortfolios(data.data.content)
        setTotalPages(data.data.totalPages)
        setTotalElements(data.data.totalElements)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status
          if (status === 400) setError('인증이 만료되었어요. 다시 로그인해 주세요.')
          else setError('포트폴리오 목록을 불러오지 못했어요.')
        } else {
          setError('알 수 없는 오류가 발생했어요.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchPortfolios()
  }, [page])

  return {
    portfolios,
    page,
    totalPages,
    totalElements,
    isLoading,
    error,
    setPage,
  }
}

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import axiosInstance from '@/lib/api/axios'
import { useRepoStore } from '@/store/repoStore'

export interface PortfolioResult {
  portfolioTitle: string
  introduction: string
  projects: {
    name: string
    oneLineDescription: string
    description: string
    estimatedPeriod: string
    role: string
    techStacks: string[]
    mainFeatures: string[]
    highlights: string[]
  }[]
  technicalContributions: string[]
  codeHighlights: string[]
  projectLinks: string[]
  generatedAt: string
}

export const useGeneratePortfolio = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { analyzeResult, setPortfolioResult } = useRepoStore()
  const router = useRouter()

  const generate = async (emphasis: string, userName: string) => {
    if (!analyzeResult) return
    setIsLoading(true)
    setError(null)

    try {
      const { data } = await axiosInstance.post('/api/portfolio/generate', {
        analysisResult: analyzeResult.aiInputData,
        userName,
        emphasis,
      })

      setPortfolioResult(data.data)
      router.push('/home/repos/analyze/portfolio')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status
        if (status === 400) setError('인증이 만료되었습니다. 다시 로그인해주세요.')
        else setError('포트폴리오 생성에 실패했습니다.')
      } else {
        setError('알 수 없는 오류가 발생했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, generate }
}
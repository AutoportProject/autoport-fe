import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import axiosInstance from '@/lib/api/axios'
import { useRepoStore } from '@/store/repoStore'
import { createPortfolio } from '@/lib/api/portfolio'
import type { CreatePortfolioRequest } from '@/types/portfolio'
import type { AnalyzeResult } from '@/store/repoStore'

export interface PortfolioResult {
  portfolioTitle: string
  introduction: string
  summary?: string
  description?: string
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

const toDraftPortfolioRequest = (
  result: PortfolioResult,
  analyzeResult: AnalyzeResult
): CreatePortfolioRequest => {
  const fallbackProjectName = analyzeResult.aiInputData.projectName || analyzeResult.repoName
  const fallbackDescription = analyzeResult.aiInputData.description || analyzeResult.description
  const fallbackTechStacks = analyzeResult.aiInputData.stacks.length > 0
    ? analyzeResult.aiInputData.stacks
    : analyzeResult.techStacks

  return {
    title: result.portfolioTitle,
    bio: result.introduction,
    ...(result.summary && { summary: result.summary }),
    ...(result.description && { description: result.description }),
    featuredProjectId: analyzeResult.repoId,
    isPublic: false,
    projects: result.projects.map((project, index) => ({
      repoId: analyzeResult.repoId,
      name: project.name || fallbackProjectName,
      description: project.description || project.oneLineDescription || fallbackDescription,
      techStacks: project.techStacks.length > 0 ? project.techStacks : fallbackTechStacks,
      highlights: project.highlights.length > 0 ? project.highlights : project.mainFeatures,
      githubUrl: analyzeResult.aiInputData.repoUrl,
      order: index + 1,
    })),
  }
}

export const useGeneratePortfolio = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { analyzeResult, setPortfolioResult, setSavedPortfolioId } = useRepoStore()
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

      const portfolioResult = data.data as PortfolioResult
      const created = await createPortfolio(toDraftPortfolioRequest(portfolioResult, analyzeResult))

      setPortfolioResult(portfolioResult)
      setSavedPortfolioId(created.portfolioId)
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
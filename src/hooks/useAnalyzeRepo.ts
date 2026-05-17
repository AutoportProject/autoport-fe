import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import axiosInstance from '@/lib/api/axios'
import { useRepoStore } from '@/store/repoStore'

export const useAnalyzeRepo = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { selectedRepo, setAnalyzeResult } = useRepoStore()
  const router = useRouter()

  const analyzeRepo = async () => {
    if (!selectedRepo) return
    setIsLoading(true)
    setError(null)

    try {
      const [owner, repoName] = selectedRepo.fullName.split('/')

      const { data } = await axiosInstance.post('/api/github/analyze', {
        repoId: selectedRepo.repoId,
        repoName,
        owner,
      })

      setAnalyzeResult(data.data)
      router.push('/home/repos/analyze')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status
        if (status === 400) setError('인증이 만료되었습니다. 다시 로그인해주세요.')
        else if (status === 403) setError('GitHub 연동이 필요합니다.')
        else setError('레포지토리 분석에 실패했습니다.')
      } else {
        setError('알 수 없는 오류가 발생했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, analyzeRepo }
}
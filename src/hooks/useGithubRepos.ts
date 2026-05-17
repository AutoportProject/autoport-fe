import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import axiosInstance from '@/lib/api/axios'
import { useRepoStore, Repo } from '@/store/repoStore'

interface RepoResponse {
  success: boolean
  data: {
    content: Repo[]
    page: number
    perPage: number
    totalElements: number
    totalPages: number
  }
}

export const useGithubRepos = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const setRepos = useRepoStore((state) => state.setRepos)
  const router = useRouter()

  const fetchRepos = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { data } = await axiosInstance.get<RepoResponse>('/api/github/repos', {
        params: { sort: 'updated', direction: 'desc', page: 1, perPage: 30 },
      })

      setRepos(data.data.content)
      router.push('/home/repos')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status
        if (status === 400) setError('인증이 만료되었습니다. 다시 로그인해주세요.')
        else if (status === 403) setError('GitHub 연동이 필요합니다.')
        else setError('레포지토리를 불러오지 못했습니다.')
      } else {
        setError('알 수 없는 오류가 발생했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, error, fetchRepos }
}
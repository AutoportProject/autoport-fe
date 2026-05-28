import type {
  Portfolio,
  PortfolioListItem,
  UpdatePortfolioRequest,
  UpdatePortfolioResponse,
} from '@/types/portfolio'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

function getToken() {
  return typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
}

// 포트폴리오 목록 조회
export const fetchPortfolioList = async (params?: {
  page?: number
  perPage?: number
  sort?: 'createdAt' | 'updatedAt'
  direction?: 'asc' | 'desc'
}): Promise<PortfolioListItem[]> => {
  const query = new URLSearchParams()
  if (params?.page) query.set('page', String(params.page))
  if (params?.perPage) query.set('perPage', String(params.perPage))
  if (params?.sort) query.set('sort', params.sort)
  if (params?.direction) query.set('direction', params.direction)

  const res = await fetch(`${API_BASE_URL}/api/portfolio?${query.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return res.json()
}

// 포트폴리오 상세 조회
export const fetchPortfolioDetail = async (portfolioId: number): Promise<Portfolio> => {
  const res = await fetch(`${API_BASE_URL}/api/portfolio/${portfolioId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return res.json()
}

// 포트폴리오 수정
export const updatePortfolio = async (
  portfolioId: number,
  data: UpdatePortfolioRequest
): Promise<UpdatePortfolioResponse> => {
  const res = await fetch(`${API_BASE_URL}/api/portfolio/${portfolioId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

// 포트폴리오 삭제
export const deletePortfolio = async (portfolioId: number): Promise<{ message: string }> => {
  const res = await fetch(`${API_BASE_URL}/api/portfolio/${portfolioId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return res.json()
}
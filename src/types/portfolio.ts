export interface Project {
  repoId: number
  name: string
  description: string
  oneLineDescription?: string
  estimatedPeriod?: string
  role?: string
  techStacks?: string[]
  mainFeatures?: string[]
  highlights?: string[]
  githubUrl?: string
  deployUrl?: string
  order?: number
}

export interface Portfolio {
  portfolioId: number
  title: string
  bio: string
  introduction?: string
  summary?: string
  description?: string
  technicalContributions?: string[]
  codeHighlights?: string[]
  projectLinks?: string[]
  generatedAt?: string
  templateId: number
  isPublic: boolean
  featuredProjectId?: number
  projects: Project[]
  createdAt: string
  updatedAt: string
}

export interface PortfolioListItem {
  portfolioId: number
  title: string
  summary: string
  description: string
  isPublic: boolean
  createdAt: string
  updatedAt?: string
  templateId?: number
  featuredProjectName?: string
}

export interface UpdatePortfolioRequest {
  title: string
  bio: string
  summary?: string
  description?: string
  technicalContributions?: string[]
  codeHighlights?: string[]
  projectLinks?: string[]
  generatedAt?: string
  templateId?: number
  featuredProjectId?: number
  projects: Project[]
  isPublic?: boolean
}

export interface UpdatePortfolioResponse {
  portfolioId: number
  title: string
  updatedAt: string
}

export interface PortfolioListResponse {
  content: PortfolioListItem[]
  page: number
  perPage: number
  totalElements: number
  totalPages: number
}

export interface CreatePortfolioRequest {
  title: string
  bio: string
  summary?: string
  description?: string
  technicalContributions?: string[]
  codeHighlights?: string[]
  projectLinks?: string[]
  generatedAt?: string
  templateId?: number
  projects: Project[]
  featuredProjectId?: number
  isPublic: boolean
}

export interface CreatePortfolioResponse {
  portfolioId: number
  title: string
  createdAt: string
  isPublic: boolean
}

export interface PortfolioShareResponse {
  portfolioId: number
  shareToken: string
  shareUrl: string
  isPublic: boolean
}

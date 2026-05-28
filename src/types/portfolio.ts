export interface Project {
  repoId: number
  name: string
  description: string
  techStacks?: string[]
  highlights?: string[]
  githubUrl?: string
  order?: number
}

export interface Portfolio {
  portfolioId: number
  title: string
  bio: string
  templateId: number
  public: boolean
  featuredProjectId?: number
  projects: Project[]
  createdAt: string
  updatedAt: string
}

export interface PortfolioListItem {
  portfolioId: number
  title: string
  templateId: number
  isPublic: boolean
  featuredProjectName?: string
  createdAt: string
  updatedAt: string
}

export interface UpdatePortfolioRequest {
  title: string
  bio: string
  templateId: number
  projects: Project[]
  public?: boolean
  featuredProjectId?: number
}

export interface UpdatePortfolioResponse {
  portfolioId: number
  title: string
  updatedAt: string
}
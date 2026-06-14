import { create } from 'zustand'
import { PortfolioResult } from '@/hooks/useGeneratePortfolio'

export interface Repo {
  repoId: number
  name: string
  fullName: string
  htmlUrl: string
  description: string | null
  language: string | null
  stargazersCount: number
  forksCount: number
  updatedAt: string
  private: boolean
}

export interface AnalyzeResult {
  repoId: number
  repoName: string
  description: string
  mainLanguage: string
  techStacks: string[]
  readmeSummary: string
  activitySummary: string
  starCount: number
  commitCount: number
  prReviewCount: number
  importanceScore: number
  aiInputData: {
    projectName: string
    summary: string
    stacks: string[]
    highlights: string[]
    repoUrl: string
    description: string
    mainLanguage: string
    readmeSummary: string
    activitySummary: string
    starCount: number
    forkCount: number
    openIssuesCount: number
    commitCount: number
    prReviewCount: number
    importanceScore: number
    repositoryCreatedAt: string
    repositoryUpdatedAt: string
    firstCommitAt: string
    latestCommitAt: string
    developmentPeriod: string
    recentCommitMessages: string[]
  }
  analyzedAt: string
}

interface RepoStore {
  repos: Repo[]
  selectedRepo: Repo | null
  analyzeResult: AnalyzeResult | null
  portfolioResult: PortfolioResult | null
  savedPortfolioId: number | null
  setRepos: (repos: Repo[]) => void
  setSelectedRepo: (repo: Repo) => void
  setAnalyzeResult: (result: AnalyzeResult) => void
  setPortfolioResult: (result: PortfolioResult) => void
  setSavedPortfolioId: (id: number) => void
}

export const useRepoStore = create<RepoStore>((set) => ({
  repos: [],
  selectedRepo: null,
  analyzeResult: null,
  portfolioResult: null,
  savedPortfolioId: null,
  setRepos: (repos) => set({ repos }),
  setSelectedRepo: (repo) => set({ selectedRepo: repo }),
  setAnalyzeResult: (result) => set({ analyzeResult: result }),
  setPortfolioResult: (result) => set({ portfolioResult: result }),
  setSavedPortfolioId: (id) => set({ savedPortfolioId: id }),
}))

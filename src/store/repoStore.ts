import { create } from 'zustand'

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

interface RepoStore {
  repos: Repo[]
  selectedRepo: Repo | null
  setRepos: (repos: Repo[]) => void
  setSelectedRepo: (repo: Repo) => void
}

export const useRepoStore = create<RepoStore>((set) => ({
  repos: [],
  selectedRepo: null,
  setRepos: (repos) => set({ repos }),
  setSelectedRepo: (repo) => set({ selectedRepo: repo }),
}))
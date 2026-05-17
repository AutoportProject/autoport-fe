'use client'
import { useRepoStore } from '@/store/repoStore'
import { useAnalyzeRepo } from '@/hooks/useAnalyzeRepo'

const ReposPage = () => {
  const { repos, selectedRepo, setSelectedRepo } = useRepoStore()
  const { isLoading, error, analyzeRepo } = useAnalyzeRepo()

  return (
    <div className="flex w-full flex-col items-center gap-8 px-6 py-12">
      {/* 상단 타이틀 */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="title-bold text-neutral-950">
          포트폴리오를 생성할
          <br />
          레포지토리를 선택해 주세요
        </h1>
      </div>
      {/* 레포 리스트 박스 */}
      <div className="relative w-full max-w-xl rounded-2xl border border-neutral-200 p-6">
        {/* 스크롤 영역 */}
        <ul className="flex max-h-96 flex-col gap-3 overflow-y-auto">
          {repos.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center gap-2 text-center">
              <p className="body-m text-neutral-400">레포지토리 리스트</p>
              <p className="caption-m-sm text-neutral-300">레포지토리가 존재하지 않아요</p>
            </div>
          ) : (
            repos.map((repo) => {
              const isSelected = selectedRepo?.repoId === repo.repoId
              return (
                <li
                  key={repo.repoId}
                  onClick={() => setSelectedRepo(repo)}
                  className={`flex cursor-pointer flex-col gap-1.5 rounded-xl border p-4 transition-all ${
                    isSelected
                      ? 'border-neutral-900 bg-neutral-900 text-white'
                      : 'border-neutral-200 bg-white hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="body-sb">{repo.fullName}</span>
                    {repo.private && (
                      <span className={`caption-m-sm rounded-full border px-2 py-0.5 ${isSelected ? 'border-neutral-600 text-neutral-400' : 'border-neutral-300 text-neutral-400'}`}>
                        Private
                      </span>
                    )}
                  </div>
                  {repo.description && (
                    <p className={`body-m ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {repo.description}
                    </p>
                  )}
                  <div className="caption-m-sm flex gap-3 text-neutral-400">
                    {repo.language && <span>{repo.language}</span>}
                    <span>⭐ {repo.stargazersCount}</span>
                    <span>🍴 {repo.forksCount}</span>
                  </div>
                </li>
              )
            })
          )}
        </ul>

        {error && (
          <p className="caption-m-sm mt-3 text-red-500">{error}</p>
        )}

        {/* 다음 버튼 - 박스 우측 하단 */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={analyzeRepo}
            disabled={!selectedRepo || isLoading}
            className="body-sb rounded-xl bg-neutral-200 px-6 py-2.5 text-neutral-700 transition-all hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLoading ? '분석 중...' : '다음'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default ReposPage
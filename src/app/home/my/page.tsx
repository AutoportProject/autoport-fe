'use client'

import { ArrowRight, FileText, FolderGit, Lock, Plus, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { usePortfolios } from '@/hooks/usePortfolios'
import { useUserMe } from '@/hooks/useUserMe'
import { formatKoreanDate } from '@/lib/date'

const MyPage = () => {
  const { user } = useUserMe()
  const {
    portfolios,
    page,
    totalPages,
    totalElements,
    isLoading,
    error,
    setPage,
  } = usePortfolios()

  const latestUpdatedAt = useMemo(() => {
    const dates = portfolios
      .map((portfolio) => new Date(portfolio.updatedAt).getTime())
      .filter((time) => !Number.isNaN(time))

    if (dates.length === 0) return null

    return new Date(Math.max(...dates)).toISOString()
  }, [portfolios])

  return (
    <div className="flex w-full flex-col items-center self-start px-6 py-10">
      <div className="flex w-full max-w-5xl flex-col gap-8">
        <section className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="flex min-h-48 flex-col justify-between rounded-lg border border-neutral-200 bg-white p-6">
            <div className="flex items-start gap-4">
              {user?.profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.profileImage}
                  alt=""
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
                  <UserRound size={28} />
                </div>
              )}
              <div className="flex min-w-0 flex-col gap-2">
                <span className="caption-m-sm text-neutral-400">마이페이지</span>
                <h1 className="title-sb-lg truncate text-neutral-950">
                  {user?.name ?? '사용자'}님의 포트폴리오
                </h1>
                <p className="body-m break-keep text-neutral-500">
                  {user?.bio || '생성한 포트폴리오를 모아보고 상세 내용을 확인해요.'}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-neutral-50 p-4">
                <span className="caption-m-sm text-neutral-400">이메일</span>
                <p className="caption-m-lg mt-1 truncate text-neutral-700">
                  {user?.email ?? '-'}
                </p>
              </div>
              <div className="rounded-lg bg-neutral-50 p-4">
                <span className="caption-m-sm text-neutral-400">로그인 방식</span>
                <p className="caption-m-lg mt-1 text-neutral-700">
                  {user?.provider ?? '-'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            <div className="flex flex-col justify-between rounded-lg border border-blue-100 bg-blue-50 p-5">
              <span className="caption-m-sm text-blue-500">전체 포트폴리오</span>
              <strong className="mt-6 text-4xl font-bold leading-none text-neutral-950">
                {totalElements}
              </strong>
            </div>
            <div className="flex flex-col justify-between rounded-lg border border-neutral-200 bg-white p-5">
              <span className="caption-m-sm text-neutral-400">최근 업데이트</span>
              <strong className="body-sb mt-6 text-neutral-950">
                {formatKoreanDate(latestUpdatedAt ?? undefined)}
              </strong>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="caption-m-sm text-neutral-400">Portfolio Archive</span>
              <h2 className="title-sb-md mt-1 text-neutral-950">내 포트폴리오</h2>
            </div>
            <Button asChild className="h-10 gap-2 rounded-lg bg-blue-500 px-4 text-white hover:bg-blue-600">
              <Link href="/home">
                <Plus size={16} />
                새 포트폴리오 만들기
              </Link>
            </Button>
          </div>

          {error ? (
            <div className="flex flex-col gap-3 rounded-lg border border-red-100 bg-red-50 px-5 py-4 text-red-600 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <p className="caption-m-lg">{error}</p>
                <p className="caption-m-sm text-red-400">
                  로그인 후 생성한 포트폴리오 목록을 확인할 수 있어요.
                </p>
              </div>
              <Button asChild variant="outline" className="h-9 w-fit rounded-lg border-red-200 bg-white px-4 text-red-600 hover:bg-red-100">
                <Link href="/login">로그인하러 가기</Link>
              </Button>
            </div>
          ) : isLoading ? (
            <div className="grid gap-3 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-40 animate-pulse rounded-lg bg-neutral-100" />
              ))}
            </div>
          ) : portfolios.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-neutral-500">
                <FileText size={26} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="body-sb text-neutral-950">아직 포트폴리오가 없어요</h3>
                <p className="body-m break-keep text-neutral-500">
                  레포지토리를 분석해서 첫 포트폴리오를 만들어보세요.
                </p>
              </div>
              <Button asChild className="h-10 rounded-lg bg-blue-500 px-4 text-white hover:bg-blue-600">
                <Link href="/home">시작하기</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {portfolios.map((portfolio) => (
                <Link
                  key={String(portfolio.portfolioId)}
                  href={`/home/my/portfolios/${portfolio.portfolioId}`}
                  className="group flex min-h-44 flex-col justify-between rounded-lg border border-neutral-200 bg-white p-5 transition-all hover:border-neutral-400 hover:bg-neutral-50"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="caption-m-sm text-neutral-400">
                        Template {portfolio.templateId}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-2 py-1 text-xs font-medium text-neutral-500">
                        {portfolio.isPublic ? (
                          <>
                            <FolderGit size={12} />
                            Public
                          </>
                        ) : (
                          <>
                            <Lock size={12} />
                            Private
                          </>
                        )}
                      </span>
                    </div>
                    <div>
                      <h3 className="body-sb line-clamp-2 text-neutral-950">
                        {portfolio.featuredProjectName ?? portfolio.title}
                      </h3>
                      <p className="body-m mt-2 line-clamp-3 whitespace-pre-line text-neutral-500">
                        {portfolio.summary || portfolio.description || '프로젝트 요약이 아직 없어요.'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="caption-m-sm text-neutral-400">
                      {formatKoreanDate(portfolio.updatedAt)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-neutral-700 transition-transform group-hover:translate-x-1">
                      상세보기
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                className="h-9 rounded-lg px-4"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                이전
              </Button>
              <span className="caption-m-sm text-neutral-500">
                {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                className="h-9 rounded-lg px-4"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                다음
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default MyPage

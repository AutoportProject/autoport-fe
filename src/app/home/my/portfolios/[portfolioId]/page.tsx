'use client'

import { ArrowLeft, ExternalLink, FolderGit, Lock, Star } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { usePortfolioDetail } from '@/hooks/usePortfolioDetail'
import { formatKoreanDate } from '@/lib/date'

const PortfolioDetailPage = () => {
  const params = useParams<{ portfolioId: string }>()
  const portfolioId = params.portfolioId
  const { portfolio, isLoading, error } = usePortfolioDetail(portfolioId)

  if (isLoading) {
    return (
      <div className="flex w-full justify-center self-start px-6 py-10">
      <div className="flex w-full max-w-4xl flex-col gap-4 self-start">
          <div className="h-8 w-36 animate-pulse rounded bg-neutral-100" />
          <div className="h-44 animate-pulse rounded-lg bg-neutral-100" />
          <div className="h-72 animate-pulse rounded-lg bg-neutral-100" />
        </div>
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 self-start px-6 py-20 text-center">
        <p className="body-m text-neutral-500">
          {error ?? '포트폴리오를 불러올 수 없어요.'}
        </p>
        <Button asChild variant="outline" className="h-10 rounded-lg px-4">
          <Link href="/home/my">목록으로 돌아가기</Link>
        </Button>
      </div>
    )
  }

  const featuredProject = portfolio.projects.find(
    (project) => String(project.repoId) === String(portfolio.featuredProjectId),
  )

  return (
    <div className="flex w-full justify-center self-start px-6 py-10">
      <div className="flex w-full max-w-4xl flex-col gap-6 self-start">
        <Button asChild variant="ghost" className="h-9 w-fit gap-2 rounded-lg px-2">
          <Link href="/home/my">
            <ArrowLeft size={16} />
            목록으로
          </Link>
        </Button>

        <section className="rounded-lg border border-neutral-200 bg-white p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <span className="caption-m-sm text-neutral-400">
                  Template {portfolio.templateId}
                </span>
                <h1 className="title-bold mt-2 break-keep text-neutral-950">
                  {portfolio.title}
                </h1>
                <p className="body-m mt-3 break-keep leading-relaxed text-neutral-500">
                  {portfolio.bio || '소개 문구가 아직 없어요.'}
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-1 rounded-full border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-500">
                {portfolio.isPublic ? (
                  <>
                    <FolderGit size={14} />
                    Public
                  </>
                ) : (
                  <>
                    <Lock size={14} />
                    Private
                  </>
                )}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg bg-neutral-50 p-4">
                <span className="caption-m-sm text-neutral-400">생성일</span>
                <p className="caption-m-lg mt-1 text-neutral-700">
                  {formatKoreanDate(portfolio.createdAt)}
                </p>
              </div>
              <div className="rounded-lg bg-neutral-50 p-4">
                <span className="caption-m-sm text-neutral-400">수정일</span>
                <p className="caption-m-lg mt-1 text-neutral-700">
                  {formatKoreanDate(portfolio.updatedAt)}
                </p>
              </div>
              <div className="rounded-lg bg-neutral-50 p-4">
                <span className="caption-m-sm text-neutral-400">프로젝트</span>
                <p className="caption-m-lg mt-1 text-neutral-700">
                  {portfolio.projects.length}개
                </p>
              </div>
            </div>
          </div>
        </section>

        {featuredProject && (
          <section className="rounded-lg border border-blue-100 bg-blue-50 p-6">
            <div className="flex items-center gap-2 text-blue-500">
              <Star size={16} />
              <span className="caption-m-sm">대표 프로젝트</span>
            </div>
            <h2 className="body-sb mt-4 text-neutral-950">{featuredProject.name}</h2>
            <p className="body-m mt-2 break-keep text-neutral-600">
              {featuredProject.description}
            </p>
          </section>
        )}

        <section className="flex flex-col gap-3">
          <div>
            <span className="caption-m-sm text-neutral-400">Projects</span>
            <h2 className="title-sb-md mt-1 text-neutral-950">프로젝트 구성</h2>
          </div>

          <div className="flex flex-col gap-3">
            {portfolio.projects.map((project) => (
              <article
                key={`${project.repoId}-${project.order}`}
                className="rounded-lg border border-neutral-200 bg-white p-5"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span className="caption-m-sm text-neutral-400">
                        Project {project.order}
                      </span>
                      <h3 className="body-sb mt-1 text-neutral-950">{project.name}</h3>
                    </div>
                    {project.githubUrl && (
                      <Button asChild variant="outline" className="h-9 w-fit gap-2 rounded-lg px-3">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <FolderGit size={15} />
                          GitHub
                          <ExternalLink size={14} />
                        </a>
                      </Button>
                    )}
                  </div>

                  <p className="body-m break-keep leading-relaxed text-neutral-600">
                    {project.description}
                  </p>

                  {project.techStacks.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.techStacks.map((stack) => (
                        <span
                          key={stack}
                          className="rounded-full bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700"
                        >
                          {stack}
                        </span>
                      ))}
                    </div>
                  )}

                  {project.highlights.length > 0 && (
                    <ul className="flex flex-col gap-2 border-t border-neutral-100 pt-4">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="body-m flex gap-2 text-neutral-700">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default PortfolioDetailPage

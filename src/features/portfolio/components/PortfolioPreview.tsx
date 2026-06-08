'use client'

import {
  CalendarDays,
  ExternalLink,
  FileText,
  FolderGit,
  Link as LinkIcon,
  Lock,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatKoreanDate } from '@/lib/date'

export interface PortfolioPreviewProject {
  repoId?: number | string
  name: string
  description?: string
  techStacks?: string[]
  highlights?: string[]
  githubUrl?: string
  deployUrl?: string
  order?: number
}

export interface PortfolioPreviewData {
  title: string
  bio?: string
  summary?: string
  description?: string
  templateId?: number | string
  projects: PortfolioPreviewProject[]
  createdAt?: string
  updatedAt?: string
  isPublic?: boolean
}

interface PortfolioPreviewProps {
  portfolio: PortfolioPreviewData
  eyebrow?: string
}

export default function PortfolioPreview({ portfolio, eyebrow }: PortfolioPreviewProps) {
  const hasMeta = portfolio.createdAt || portfolio.updatedAt || portfolio.projects.length > 0

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
        <div className="h-1.5 bg-neutral-950" />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="caption-m-sm text-neutral-400">
                  {eyebrow ?? (portfolio.templateId ? `Template ${portfolio.templateId}` : 'Portfolio')}
                </span>
                {portfolio.templateId && eyebrow && (
                  <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-500">
                    Template {portfolio.templateId}
                  </span>
                )}
              </div>
              <h1 className="title-bold mt-2 break-keep text-neutral-950">
                {portfolio.title}
              </h1>
              <p className="body-m mt-3 max-w-3xl whitespace-pre-line break-keep leading-relaxed text-neutral-500">
                {portfolio.bio || '소개 문구가 아직 없어요.'}
              </p>
            </div>
            {typeof portfolio.isPublic === 'boolean' && (
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
            )}
          </div>

          {hasMeta && (
            <div className="grid border-t border-neutral-100 sm:grid-cols-3">
              <div className="flex gap-3 px-6 py-4 sm:border-r sm:border-neutral-100">
                <CalendarDays className="mt-0.5 shrink-0 text-neutral-300" size={18} />
                <div>
                  <span className="caption-m-sm text-neutral-400">생성일</span>
                  <p className="caption-m-lg mt-1 text-neutral-700">
                    {formatKoreanDate(portfolio.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 border-t border-neutral-100 px-6 py-4 sm:border-r sm:border-t-0 sm:border-neutral-100">
                <Sparkles className="mt-0.5 shrink-0 text-neutral-300" size={18} />
                <div>
                  <span className="caption-m-sm text-neutral-400">수정일</span>
                  <p className="caption-m-lg mt-1 text-neutral-700">
                    {formatKoreanDate(portfolio.updatedAt)}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 border-t border-neutral-100 px-6 py-4 sm:border-t-0">
                <FolderGit className="mt-0.5 shrink-0 text-neutral-300" size={18} />
                <div>
                  <span className="caption-m-sm text-neutral-400">프로젝트</span>
                  <p className="caption-m-lg mt-1 text-neutral-700">
                    {portfolio.projects.length}개
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {(portfolio.summary || portfolio.description) && (
        <section className="grid gap-3 md:grid-cols-[0.9fr_1.1fr]">
          {portfolio.summary && (
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-5">
              <div className="flex items-center gap-2 text-blue-600">
                <FileText size={17} />
                <span className="caption-m-sm">요약</span>
              </div>
              <p className="body-m mt-3 whitespace-pre-line break-keep leading-relaxed text-neutral-700">
                {portfolio.summary}
              </p>
            </div>
          )}
          {portfolio.description && (
            <div className="rounded-lg border border-neutral-200 bg-white p-5">
              <span className="caption-m-sm text-neutral-400">설명</span>
              <p className="body-m mt-3 whitespace-pre-line break-keep leading-relaxed text-neutral-700">
                {portfolio.description}
              </p>
            </div>
          )}
        </section>
      )}

      <section className="flex flex-col gap-3">
        <div>
          <span className="caption-m-sm text-neutral-400">Projects</span>
          <h2 className="title-sb-md mt-1 text-neutral-950">프로젝트 구성</h2>
        </div>

        <div className="flex flex-col gap-3">
          {portfolio.projects.map((project, index) => (
            <article
              key={`${project.repoId ?? project.name}-${project.order ?? index}`}
              className="rounded-lg border border-neutral-200 bg-white p-5"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span className="inline-flex w-fit rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-500">
                      Project {project.order ?? index + 1}
                    </span>
                    <h3 className="body-sb mt-1 text-neutral-950">{project.name}</h3>
                  </div>
                  {(project.githubUrl || project.deployUrl) && (
                    <div className="flex flex-wrap gap-2">
                      {project.githubUrl && (
                        <Button asChild variant="outline" className="h-9 w-fit gap-2 rounded-lg px-3">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <FolderGit size={15} />
                            GitHub
                            <ExternalLink size={14} />
                          </a>
                        </Button>
                      )}
                      {project.deployUrl && (
                        <Button asChild variant="outline" className="h-9 w-fit gap-2 rounded-lg px-3">
                          <a href={project.deployUrl} target="_blank" rel="noopener noreferrer">
                            <LinkIcon size={15} />
                            배포
                            <ExternalLink size={14} />
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {project.description && (
                  <p className="body-m whitespace-pre-line break-keep border-l-2 border-neutral-200 pl-4 leading-relaxed text-neutral-600">
                    {project.description}
                  </p>
                )}

                {(project.techStacks?.length ?? 0) > 0 && (
                  <div>
                    <span className="caption-m-sm text-neutral-400">기술 스택</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.techStacks?.map((stack) => (
                        <span
                          key={stack}
                          className="rounded-full bg-neutral-100 px-3 py-1.5 text-sm font-semibold text-neutral-700"
                        >
                          {stack}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {(project.highlights?.length ?? 0) > 0 && (
                  <div className="border-t border-neutral-100 pt-4">
                    <span className="caption-m-sm text-neutral-400">하이라이트</span>
                    <ul className="mt-2 flex flex-col gap-2">
                      {project.highlights?.map((highlight) => (
                      <li key={highlight} className="body-m flex gap-2 text-neutral-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                        <span>{highlight}</span>
                      </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePortfolioDetail, useUpdatePortfolio } from '@/hooks/usePortfolio'
import type { Project, UpdatePortfolioRequest } from '@/types/portfolio'

function ProjectEditor({
  project,
  index,
  onChange,
  onRemove,
  isFeatured,
  onSetFeatured,
}: {
  project: Project
  index: number
  onChange: (updated: Project) => void
  onRemove: () => void
  isFeatured: boolean
  onSetFeatured: () => void
}) {
  function update<K extends keyof Project>(key: K, value: Project[K]) {
    onChange({ ...project, [key]: value })
  }

  function handleArrayInput(key: 'techStacks' | 'highlights', raw: string) {
    update(key, raw.split(',').map((s) => s.trim()).filter(Boolean))
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 p-6">
      <div className="flex items-center justify-between">
        <span className="caption-m-sm text-neutral-400">프로젝트 {index + 1}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSetFeatured}
            className={`caption-m-sm rounded-full px-3 py-1 transition ${
              isFeatured
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
            }`}
          >
            {isFeatured ? '★ 대표' : '대표로 설정'}
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="caption-m-sm rounded-full bg-red-50 px-3 py-1 text-red-400 hover:bg-red-100 transition"
          >
            삭제
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <span className="caption-m-sm text-neutral-400">프로젝트 이름</span>
          <input
            value={project.name ?? ''}
            onChange={(e) => update('name', e.target.value)}
            placeholder="autoport"
            className="body-m mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-700 focus:outline-none focus:border-neutral-400"
          />
        </div>

        <div>
          <span className="caption-m-sm text-neutral-400">프로젝트 설명</span>
          <textarea
            value={project.description ?? ''}
            onChange={(e) => update('description', e.target.value)}
            rows={3}
            placeholder="프로젝트에 대한 간략한 설명"
            className="body-m mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-700 focus:outline-none focus:border-neutral-400 resize-none"
          />
        </div>

        <div>
          <span className="caption-m-sm text-neutral-400">GitHub URL</span>
          <input
            value={project.githubUrl ?? ''}
            onChange={(e) => update('githubUrl', e.target.value)}
            placeholder="https://github.com/user/repo"
            className="body-m mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-700 focus:outline-none focus:border-neutral-400"
          />
        </div>

        <div>
          <span className="caption-m-sm text-neutral-400">
            기술 스택 <span className="text-neutral-300">(쉼표로 구분)</span>
          </span>
          <input
            value={(project.techStacks ?? []).join(', ')}
            onChange={(e) => handleArrayInput('techStacks', e.target.value)}
            placeholder="Java, Spring Boot, MySQL"
            className="body-m mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-700 focus:outline-none focus:border-neutral-400"
          />
          {(project.techStacks ?? []).length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {project.techStacks!.map((stack) => (
                <span key={stack} className="caption-m-sm rounded-full bg-neutral-900 px-3 py-1.5 text-white">
                  {stack}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="caption-m-sm text-neutral-400">
            주요 기능 <span className="text-neutral-300">(쉼표로 구분)</span>
          </span>
          <input
            value={(project.highlights ?? []).join(', ')}
            onChange={(e) => handleArrayInput('highlights', e.target.value)}
            placeholder="GitHub OAuth 로그인, Gemini 기반 생성"
            className="body-m mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-700 focus:outline-none focus:border-neutral-400"
          />
          {(project.highlights ?? []).length > 0 && (
            <ul className="mt-2 flex flex-col gap-1.5">
              {project.highlights!.map((h, i) => (
                <li key={i} className="body-m flex gap-2 text-neutral-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PortfolioEditPage({ portfolioId }: { portfolioId: number }) {
  const router = useRouter()
  const { portfolio, loading: fetching, error: fetchError } = usePortfolioDetail(portfolioId)
  const { update, loading: saving, error: saveError } = useUpdatePortfolio()

  const [form, setForm] = useState<UpdatePortfolioRequest>({
    title: '',
    bio: '',
    templateId: 1,
    projects: [],
    public: true,
    featuredProjectId: undefined,
  })
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    if (!portfolio) return
    setForm({
      title: portfolio.title ?? '',
      bio: portfolio.bio ?? '',
      templateId: portfolio.templateId,
      projects: portfolio.projects ?? [],
      public: portfolio.public,
      featuredProjectId: portfolio.featuredProjectId,
    })
  }, [portfolio])

  function updateProject(index: number, updated: Project) {
    setForm((prev) => {
      const projects = [...(prev.projects ?? [])]
      projects[index] = updated
      return { ...prev, projects }
    })
  }

  function removeProject(index: number) {
    setForm((prev) => ({
      ...prev,
      projects: (prev.projects ?? []).filter((_, i) => i !== index),
    }))
  }

  function addProject() {
    const newProject: Project = {
      repoId: Date.now(),
      name: '',
      description: '',
      techStacks: [],
      highlights: [],
      githubUrl: '',
      order: (form.projects ?? []).length + 1,
    }
    setForm((prev) => ({ ...prev, projects: [...(prev.projects ?? []), newProject] }))
  }

  async function handleSubmit() {
    if (!form.title.trim()) {
      alert('포트폴리오 제목을 입력해주세요.')
      return
    }
    try {
      await update(portfolioId, form)
      setSuccessMsg('저장되었습니다!')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch {
      // 에러는 훅에서 관리
    }
  }

  if (fetching) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
        <p className="body-m text-neutral-400">불러오는 중...</p>
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <p className="body-m text-neutral-400">{fetchError}</p>
        <button
          onClick={() => router.push('/portfolio')}
          className="caption-m-sm text-neutral-500 underline underline-offset-4"
        >
          돌아가기
        </button>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center gap-10 px-6 py-12">
      {/* 헤더 */}
      <div className="flex w-full max-w-2xl flex-col gap-1">
        <button
          onClick={() => router.push('/portfolio')}
          className="caption-m-sm mb-2 w-fit text-neutral-400 hover:text-neutral-700 transition"
        >
          ← 목록으로
        </button>
        <h1 className="title-bold text-neutral-950">포트폴리오 편집</h1>
        <p className="body-m text-neutral-500">내용을 수정하고 저장하세요</p>
      </div>

      <div className="flex w-full max-w-2xl flex-col gap-4">
        {/* 기본 정보 */}
        <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 p-6">
          <span className="caption-m-sm text-neutral-400">기본 정보</span>

          <div>
            <span className="caption-m-sm text-neutral-400">포트폴리오 제목</span>
            <input
              value={form.title ?? ''}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="백엔드 개발자 홍길동"
              className="body-m mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-700 focus:outline-none focus:border-neutral-400"
            />
          </div>

          <div>
            <span className="caption-m-sm text-neutral-400">자기소개</span>
            <textarea
              value={form.bio ?? ''}
              onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
              rows={4}
              placeholder="간략한 자기소개를 작성해주세요."
              className="body-m mt-1 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-700 focus:outline-none focus:border-neutral-400 resize-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.public ?? true}
                onChange={(e) => setForm((p) => ({ ...p, public: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-neutral-200 rounded-full peer peer-checked:bg-neutral-900 transition" />
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-4 shadow-sm" />
            </label>
            <span className="body-m text-neutral-600">{form.public ? '공개' : '비공개'}</span>
          </div>
        </div>

        {/* 프로젝트 목록 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="caption-m-sm text-neutral-400">
              프로젝트 목록 {(form.projects ?? []).length}개
            </span>
            <button
              type="button"
              onClick={addProject}
              className="caption-m-sm rounded-full border border-neutral-200 px-3 py-1 text-neutral-600 hover:bg-neutral-50 transition"
            >
              + 추가
            </button>
          </div>

          {(form.projects ?? []).length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-neutral-200 py-12">
              <p className="body-m text-neutral-400">아직 프로젝트가 없어요. 추가해보세요!</p>
            </div>
          ) : (
            (form.projects ?? []).map((project, i) => (
              <ProjectEditor
                key={project.repoId}
                project={project}
                index={i}
                onChange={(updated) => updateProject(i, updated)}
                onRemove={() => removeProject(i)}
                isFeatured={form.featuredProjectId === project.repoId}
                onSetFeatured={() => setForm((p) => ({ ...p, featuredProjectId: project.repoId }))}
              />
            ))
          )}
        </div>
      </div>

      {saveError && (
        <div className="w-full max-w-2xl rounded-xl bg-red-50 px-4 py-3">
          <p className="body-m text-red-500">{saveError}</p>
        </div>
      )}

      {successMsg && (
        <div className="w-full max-w-2xl rounded-xl bg-neutral-50 px-4 py-3">
          <p className="body-m text-neutral-600">{successMsg}</p>
        </div>
      )}

      {/* 저장 버튼 */}
      <div className="flex w-full max-w-2xl flex-col gap-3">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="body-sb w-full rounded-2xl bg-neutral-900 py-5 text-white transition-all hover:bg-neutral-800 disabled:opacity-50"
        >
          {saving ? '저장 중...' : '저장하기'}
        </button>
        <button
          onClick={() => router.push('/portfolio')}
          className="body-m w-full rounded-2xl border border-neutral-200 py-4 text-neutral-600 hover:bg-neutral-50 transition"
        >
          취소
        </button>
      </div>
    </div>
  )
}
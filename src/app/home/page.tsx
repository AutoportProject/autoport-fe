'use client'

import FeatureCard from '@/features/home/components/FeatureCard'
import { Button } from '@/components/ui/button'
import { useGithubRepos } from '@/hooks/useGithubRepos'

const HomePage = () => {
  const { isLoading, error, fetchRepos } = useGithubRepos()

  return (
    <div className="flex w-full flex-col gap-20 px-6 py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-5">
        <div className="flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="caption-m-sm text-neutral-500">
            개발 스토리를 포트폴리오로
          </span>
        </div>
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="title-bold text-neutral-950">
            나만의 개발 스토리를 담는
            <br />
            포트폴리오 서비스
          </h1>
          <p className="body-m break-keep leading-relaxed text-neutral-400">
            GitHub 활동과 프로젝트 경험을 연결해
            <br />
            나만의 개발 여정을 한눈에 정리해보세요.
          </p>
        </div>
      </section>
      {/* Cards */}
      <section>
        <div className="grid grid-cols-3 gap-6">
          <FeatureCard
            label="PROJECT ARCHIVE"
            title={'프로젝트를\n보기 좋게 정리'}
            theme="dark"
          />
          <FeatureCard
            label="GITHUB SYNC"
            title={'GitHub 기록을\n자동으로 연결'}
            theme="light"
          />
          <FeatureCard
            label="TECH STACK"
            title={'기술 스택과\n성장 흐름 시각화'}
            theme="blue"
          />
        </div>
      </section>
      {/* CTA */}
      <section className="flex flex-col items-center gap-3">
        <Button
          variant="secondary"
          className="body-sb h-auto rounded-2xl bg-neutral-900 px-10 py-5 text-white hover:bg-neutral-800 disabled:opacity-50"
          onClick={fetchRepos}
          disabled={isLoading}
        >
          {isLoading ? '불러오는 중...' : 'Github에서 레포지토리 불러오기'}
        </Button>
        <p className="caption-m-sm text-neutral-400">
          {error ?? '몇 분 안에 나만의 포트폴리오를 시작해보세요.'}
        </p>
      </section>
    </div>
  )
}

export default HomePage
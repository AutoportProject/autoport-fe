'use client'

import { ArrowRight, CheckCircle2, FileText, GitBranch, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FeatureCard from '@/features/home/components/FeatureCard'
import { useGithubRepos } from '@/hooks/useGithubRepos'

const HomePage = () => {
  const { isLoading, error, fetchRepos } = useGithubRepos()

  return (
    <div className="flex w-full flex-col items-center px-6 py-12">
      <div className="flex w-full max-w-6xl flex-col gap-12">
        <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col gap-7">
            <div className="flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-blue-600">
              <Sparkles size={16} />
              <span className="caption-m-sm">기업 제출용 포트폴리오 준비</span>
            </div>

            <div className="flex flex-col gap-5">
              <h1 className="text-5xl font-bold leading-tight text-neutral-950">
                GitHub 기록을
                <br />
                제출 가능한 포트폴리오로
              </h1>
              <p className="body-m max-w-xl break-keep leading-relaxed text-neutral-500">
                프로젝트 경험, 기술 스택, 핵심 기여를 한 번에 정리해
                이력서와 기업 제출에 바로 활용할 수 있는 포트폴리오를 만들어보세요.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                variant="secondary"
                className="body-sb h-14 w-full gap-2 rounded-lg bg-neutral-950 px-6 text-white hover:bg-neutral-800 disabled:opacity-50 sm:w-fit"
                onClick={fetchRepos}
                disabled={isLoading}
              >
                <GitBranch size={20} />
                {isLoading ? '불러오는 중...' : 'GitHub에서 레포지토리 불러오기'}
                {!isLoading && <ArrowRight size={18} />}
              </Button>
              <p className="caption-m-sm text-neutral-400">
                {error ?? '레포지토리 선택 후 포트폴리오 초안을 생성할 수 있어요.'}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div>
                <p className="caption-m-sm text-neutral-400">Portfolio Draft</p>
                <h2 className="body-sb mt-1 text-neutral-950">제출 자료 구성</h2>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-white">
                <FileText size={20} />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              {[
                '프로젝트 한 줄 소개',
                '담당 역할과 핵심 기여',
                '사용 기술 스택',
                'GitHub 및 배포 링크',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg bg-neutral-50 px-4 py-3"
                >
                  <CheckCircle2 size={18} className="text-blue-500" />
                  <span className="body-m text-neutral-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            label="PROJECT SUMMARY"
            title={'프로젝트 경험을\n읽기 쉽게 정리'}
            description="레포지토리 설명과 활동 기록을 바탕으로 제출용 프로젝트 내용을 정돈합니다."
            theme="dark"
          />
          <FeatureCard
            label="GITHUB SYNC"
            title={'GitHub 기록을\n자동으로 연결'}
            description="커밋, README, 기술 정보를 불러와 포트폴리오 초안에 반영합니다."
            theme="light"
          />
          <FeatureCard
            label="TECH CONTRIBUTION"
            title={'기술 스택과\n핵심 기여 정리'}
            description="시각화 대신 기업이 확인하기 좋은 역할, 기여, 기술 근거를 보여줍니다."
            theme="blue"
          />
        </section>
      </div>
    </div>
  )
}

export default HomePage

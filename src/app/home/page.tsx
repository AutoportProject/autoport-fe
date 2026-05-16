import FeatureCard from '@/features/home/components/FeatureCard'

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-16 px-6 py-10">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-4">
        <div className="flex w-fit items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="caption-m-sm text-neutral-500">
            개발 스토리를 포트폴리오로
          </span>
        </div>

        <div className="flex flex-col gap-6 text-center">
          <h1 className="title-bold max-w-[760px] text-neutral-950">
            나만의 개발 스토리를 담는
            <br />
            포트폴리오 서비스
          </h1>

          <p className="body-m max-w-[560px] break-keep text-neutral-400">
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
      <section className="flex flex-col items-center gap-4">
        <button className="body-sb rounded-2xl bg-[#1C1C1C] px-10 py-5 text-white transition hover:opacity-90">
          Github에서 레포지토리 불러오기
        </button>

        <p className="caption-m-sm text-neutral-400">
          몇 분 안에 나만의 포트폴리오를 시작해보세요.
        </p>
      </section>
    </div>
  )
}

export default HomePage
import Header from '@/components/layout/Header'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-1 gap-6 px-10">
        <p className="text-center text-2xl font-bold leading-tight">
          나만의 <span className="text-blue-500">개발 스토리</span>를 담는{' '}
          <span className="text-blue-500">포트폴리오</span> 서비스,<br />
          지금 바로 시작해 가능성을 확장해 보세요.
        </p>
        <Image
          src="/main.png"
          alt="메인 이미지"
          width={700}
          height={450}
          className="object-contain"
        />
      </div>
    </div>
  )
}
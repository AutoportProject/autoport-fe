import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="flex w-full items-center justify-between px-6 py-5">
        <div className="flex flex-col gap-1">
          <span className="caption-m-sm text-neutral-900">
            AUTOPORT
          </span>

          <p className="caption-m-sm text-neutral-400">
            나만의 개발 스토리를 담는 포트폴리오 서비스
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/terms"
            className="caption-m-sm text-neutral-500 transition hover:text-neutral-900"
          >
            이용약관
          </Link>

          <Link
            href="/privacy"
            className="caption-m-sm text-neutral-500 transition hover:text-neutral-900"
          >
            개인정보처리방침
          </Link>

          <Link
            href="/contact"
            className="caption-m-sm text-neutral-500 transition hover:text-neutral-900"
          >
            문의하기
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
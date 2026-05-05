import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/logo.svg" alt="로고" width={36} height={36} />
      <span className="font-archivo-black tracking-[-0.05em] text-[#1C3154]">
        AutoPort
      </span>
    </Link>
  )
}
'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, Download, Pencil, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import PortfolioPreview from '@/features/portfolio/components/PortfolioPreview'
import { usePortfolioDetail } from '@/hooks/usePortfolioDetail'
import { createShareLink } from '@/lib/api/portfolio'

const PortfolioDetailPage = () => {
  const params = useParams<{ portfolioId: string }>()
  const portfolioId = params.portfolioId
  const { portfolio, isLoading, error } = usePortfolioDetail(portfolioId)
  const previewRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  function showToast(message: string) {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  async function handleShare() {
    try {
      const { shareToken } = await createShareLink(Number(portfolioId))
      const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || window.location.origin
      const shareUrl = `${frontendUrl}/portfolio/share/${shareToken}`
      await navigator.clipboard.writeText(shareUrl)
      showToast('링크가 복사되었습니다.')
    } catch {
      showToast('링크 복사에 실패했습니다.')
    }
  }

  const handleExportPdf = async () => {
    if (!previewRef.current || !portfolio) return

    setIsExporting(true)
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas-pro'),
        import('jspdf'),
      ])

      const element = previewRef.current
      const originalPadding = element.style.padding
      element.style.padding = '60px'

      const hiddenElements = Array.from(element.querySelectorAll<HTMLElement>('[data-pdf-hide]'))
      hiddenElements.forEach((el) => {
        el.style.display = 'none'
      })

      const addedElements: HTMLElement[] = []
      const articles = element.querySelectorAll<HTMLElement>('article')

      portfolio.projects.forEach((project, index) => {
        const article = articles[index]
        if (!article) return

        if (project.githubUrl || project.deployUrl) {
          const section = document.createElement('div')
          section.className = 'border-t border-neutral-100 pt-4'

          const caption = document.createElement('span')
          caption.className = 'caption-m-sm text-neutral-400'
          caption.textContent = '관련 링크'
          section.appendChild(caption)

          const linksEl = document.createElement('div')
          linksEl.className = 'mt-2 flex flex-col gap-1'

          if (project.githubUrl) {
            const p = document.createElement('p')
            p.className = 'body-sb text-neutral-950'
            p.textContent = `GitHub: ${project.githubUrl}`
            linksEl.appendChild(p)
          }
          if (project.deployUrl) {
            const p = document.createElement('p')
            p.className = 'body-sb text-neutral-950'
            p.textContent = `배포: ${project.deployUrl}`
            linksEl.appendChild(p)
          }

          section.appendChild(linksEl)
          article.appendChild(section)
          addedElements.push(section)
        }
      })

      let canvas
      try {
        canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
        })
      } finally {
        element.style.padding = originalPadding
        hiddenElements.forEach((el) => {
          el.style.display = ''
        })
        addedElements.forEach((el) => el.remove())
      }

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgHeight = (canvas.height * pdfWidth) / canvas.width

      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight)
      heightLeft -= pdfHeight

      while (heightLeft > 0) {
        position -= pdfHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight)
        heightLeft -= pdfHeight
      }

      pdf.save(`${portfolio?.title || 'portfolio'}.pdf`)
    } finally {
      setIsExporting(false)
    }
  }

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

  return (
    <div className="flex w-full justify-center self-start px-6 py-10">
      {toast && (
        <div className="body-m fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-neutral-900 px-6 py-3 text-white shadow-lg">
          {toast}
        </div>
      )}

      <div className="flex w-full max-w-4xl flex-col gap-6 self-start">
        <div className="flex items-center justify-between">
          <Button asChild variant="ghost" className="h-9 w-fit gap-2 rounded-lg px-2">
            <Link href="/home/my">
              <ArrowLeft size={16} />
              목록으로
            </Link>
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="h-9 gap-2 rounded-lg px-3"
              onClick={handleShare}
              disabled={!portfolio.isPublic}
            >
              <Share2 size={16} />
              공유
            </Button>
            <Button
              variant="outline"
              className="h-9 gap-2 rounded-lg px-3"
              onClick={handleExportPdf}
              disabled={isExporting}
            >
              <Download size={16} />
              {isExporting ? 'PDF 생성 중...' : 'PDF로 내보내기'}
            </Button>
            <Button asChild variant="outline" className="h-9 gap-2 rounded-lg px-3">
              <Link href={`/portfolio/${portfolioId}/edit`}>
                <Pencil size={16} />
                편집
              </Link>
            </Button>
          </div>
        </div>

        <div ref={previewRef}>
          <PortfolioPreview portfolio={portfolio} />
        </div>
      </div>
    </div>
  )
}

export default PortfolioDetailPage

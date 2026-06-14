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

        if (project.githubUrl) {
          const section = document.createElement('div')
          section.className = 'border-t border-neutral-100 pt-4'
          section.setAttribute('data-pdf-section', 'true')

          const caption = document.createElement('span')
          caption.className = 'caption-m-sm text-neutral-400'
          caption.textContent = 'GitHub 링크'
          section.appendChild(caption)

          const link = document.createElement('p')
          link.className = 'body-m mt-2 text-neutral-700'
          link.textContent = project.githubUrl
          section.appendChild(link)

          article.appendChild(section)
          addedElements.push(section)
        }

        if (project.deployUrl) {
          const section = document.createElement('div')
          section.className = 'border-t border-neutral-100 pt-4'
          section.setAttribute('data-pdf-section', 'true')

          const caption = document.createElement('span')
          caption.className = 'caption-m-sm text-neutral-400'
          caption.textContent = '배포 링크'
          section.appendChild(caption)

          const link = document.createElement('p')
          link.className = 'body-m mt-2 text-neutral-700'
          link.textContent = project.deployUrl
          section.appendChild(link)

          article.appendChild(section)
          addedElements.push(section)
        }
      })

      const elementRect = element.getBoundingClientRect()
      const sectionRects = Array.from(
        element.querySelectorAll<HTMLElement>('[data-pdf-section]'),
      ).map((el) => {
        const rect = el.getBoundingClientRect()
        return { top: rect.top - elementRect.top, bottom: rect.bottom - elementRect.top }
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

      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      const pxScale = canvas.width / elementRect.width
      const sections = sectionRects
        .map((s) => ({ top: s.top * pxScale, bottom: s.bottom * pxScale }))
        .sort((a, b) => a.top - b.top)

      const pageHeightPx = (pdfHeight * canvas.width) / pdfWidth

      const pageRanges: { start: number; end: number }[] = []
      let cursor = 0
      while (cursor < canvas.height) {
        let pageEnd = Math.min(cursor + pageHeightPx, canvas.height)

        if (pageEnd < canvas.height) {
          const crossing = sections.filter(
            (s) => s.top > cursor && s.top < pageEnd && s.bottom > pageEnd,
          )
          if (crossing.length > 0) {
            pageEnd = Math.min(...crossing.map((s) => s.top))
          }
        }

        pageRanges.push({ start: cursor, end: pageEnd })
        cursor = pageEnd
      }

      pageRanges.forEach(({ start, end }, index) => {
        const sliceHeight = end - start
        if (sliceHeight <= 0) return

        const pageCanvas = document.createElement('canvas')
        pageCanvas.width = canvas.width
        pageCanvas.height = sliceHeight

        const ctx = pageCanvas.getContext('2d')
        ctx?.drawImage(canvas, 0, start, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight)

        const sliceImgData = pageCanvas.toDataURL('image/png')
        const sliceHeightMm = (sliceHeight * pdfWidth) / canvas.width

        if (index > 0) pdf.addPage()
        pdf.addImage(sliceImgData, 'PNG', 0, 0, pdfWidth, sliceHeightMm)
      })

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

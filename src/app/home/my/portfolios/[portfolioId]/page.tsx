'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, Download } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import PortfolioPreview from '@/features/portfolio/components/PortfolioPreview'
import { usePortfolioDetail } from '@/hooks/usePortfolioDetail'

const PortfolioDetailPage = () => {
  const params = useParams<{ portfolioId: string }>()
  const portfolioId = params.portfolioId
  const { portfolio, isLoading, error } = usePortfolioDetail(portfolioId)
  const previewRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const handleExportPdf = async () => {
    if (!previewRef.current) return

    setIsExporting(true)
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      })

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
      <div className="flex w-full max-w-4xl flex-col gap-6 self-start">
        <div className="flex items-center justify-between">
          <Button asChild variant="ghost" className="h-9 w-fit gap-2 rounded-lg px-2">
            <Link href="/home/my">
              <ArrowLeft size={16} />
              목록으로
            </Link>
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
        </div>

        <div ref={previewRef}>
          <PortfolioPreview portfolio={portfolio} />
        </div>
      </div>
    </div>
  )
}

export default PortfolioDetailPage

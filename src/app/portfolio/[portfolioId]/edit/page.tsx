import PortfolioEditPage from '@/features/portfolio/components/PortfolioEditPage'

export default async function Page({ params }: { params: Promise<{ portfolioId: string }> }) {
  const { portfolioId } = await params
  return <PortfolioEditPage portfolioId={Number(portfolioId)} />
}
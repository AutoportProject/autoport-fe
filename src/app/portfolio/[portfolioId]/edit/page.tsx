import PortfolioEditPage from '@/features/portfolio/components/PortfolioEditPage'

export default function Page({ params }: { params: { portfolioId: string } }) {
  return <PortfolioEditPage portfolioId={Number(params.portfolioId)} />
}
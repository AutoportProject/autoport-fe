export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen px-10 py-16 max-w-3xl mx-auto">
      <h1 className="title-bold mb-8">이용 약관</h1>
      <div className="flex flex-col gap-6 body-m">
        <section>
          <h2 className="title-sb-md mb-2">제1조 (목적)</h2>
          <p>본 약관은 AutoPort 서비스 이용에 관한 조건 및 절차를 규정합니다.</p>
        </section>
        <section>
          <h2 className="title-sb-md mb-2">제2조 (서비스 이용)</h2>
          <p>서비스 이용자는 본 약관에 동의한 것으로 간주합니다.</p>
        </section>
        <section>
          <h2 className="title-sb-md mb-2">제3조 (개인정보 보호)</h2>
          <p>수집된 개인정보는 서비스 제공 목적 외에 사용되지 않습니다.</p>
        </section>
      </div>
    </div>
  )
}
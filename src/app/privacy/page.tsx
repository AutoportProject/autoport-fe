export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen px-10 py-16 max-w-3xl mx-auto">
      <h1 className="title-bold mb-8">개인정보처리방침</h1>
      <div className="flex flex-col gap-6 body-m">
        <section>
          <h2 className="title-sb-md mb-2">제1조 (수집하는 개인정보 항목)</h2>
          <p>AutoPort는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>
          <ul className="mt-2 flex flex-col gap-1 list-disc list-inside text-neutral-600">
            <li>GitHub 계정 정보 (사용자명, 이메일, 프로필 사진)</li>
            <li>GitHub 레포지토리 정보 (레포지토리명, 설명, 사용 언어)</li>
            <li>서비스 이용 기록 및 접속 로그</li>
          </ul>
        </section>
        <section>
          <h2 className="title-sb-md mb-2">제2조 (개인정보 수집 및 이용 목적)</h2>
          <p>수집한 개인정보는 다음 목적으로만 활용됩니다.</p>
          <ul className="mt-2 flex flex-col gap-1 list-disc list-inside text-neutral-600">
            <li>회원 식별 및 인증</li>
            <li>포트폴리오 자동 생성 서비스 제공</li>
            <li>서비스 개선 및 통계 분석</li>
          </ul>
        </section>
        <section>
          <h2 className="title-sb-md mb-2">제3조 (개인정보 보유 및 이용 기간)</h2>
          <p>회원 탈퇴 시 또는 수집·이용 목적이 달성된 후 지체 없이 파기합니다. 단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.</p>
        </section>
        <section>
          <h2 className="title-sb-md mb-2">제4조 (개인정보의 제3자 제공)</h2>
          <p>AutoPort는 수집한 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 이용자가 사전에 동의한 경우 또는 법령에 의해 요구되는 경우에는 예외로 합니다.</p>
        </section>
        <section>
          <h2 className="title-sb-md mb-2">제5조 (이용자의 권리)</h2>
          <p>이용자는 언제든지 자신의 개인정보를 조회, 수정, 삭제할 수 있으며, 개인정보 처리에 대한 동의를 철회할 수 있습니다. 관련 요청은 고객센터(support@autoport.dev)로 문의해 주세요.</p>
        </section>
        <section>
          <h2 className="title-sb-md mb-2">제6조 (개인정보 보호책임자)</h2>
          <p>개인정보 처리에 관한 업무를 총괄하고 관련 불만 처리 및 피해구제를 담당합니다.</p>
          <p className="mt-2 text-neutral-600">이메일: support@autoport.dev</p>
        </section>
        <section>
          <h2 className="title-sb-md mb-2">부칙</h2>
          <p className="text-neutral-500">본 방침은 2025년 1월 1일부터 시행됩니다.</p>
        </section>
      </div>
    </div>
  )
}

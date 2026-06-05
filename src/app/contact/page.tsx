export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen px-10 py-16 max-w-3xl mx-auto">
      <h1 className="title-bold mb-8">문의하기</h1>
      <div className="flex flex-col gap-6 body-m">
        <section>
          <h2 className="title-sb-md mb-2">이메일 문의</h2>
          <p>서비스 이용 중 불편한 점이나 개선 사항은 아래 이메일로 문의해 주세요.</p>
          <p className="mt-2 text-neutral-700 font-medium">support@autoport.dev</p>
        </section>
        <section>
          <h2 className="title-sb-md mb-2">문의 가능 시간</h2>
          <p>평일 오전 10시 ~ 오후 6시 (주말 및 공휴일 제외)</p>
          <p className="mt-1 text-neutral-500">접수된 문의는 영업일 기준 1~3일 이내에 답변 드립니다.</p>
        </section>
        <section>
          <h2 className="title-sb-md mb-2">자주 묻는 질문</h2>
          <ul className="flex flex-col gap-3 mt-1">
            <li>
              <p className="font-medium text-neutral-800">Q. 포트폴리오 생성은 무료인가요?</p>
              <p className="mt-0.5 text-neutral-500">A. 네, AutoPort의 기본 포트폴리오 생성 기능은 무료로 제공됩니다.</p>
            </li>
            <li>
              <p className="font-medium text-neutral-800">Q. 비공개로 설정한 포트폴리오는 누가 볼 수 있나요?</p>
              <p className="mt-0.5 text-neutral-500">A. 비공개 포트폴리오는 본인만 열람할 수 있습니다.</p>
            </li>
            <li>
              <p className="font-medium text-neutral-800">Q. 깃허브 계정 연동은 어떻게 하나요?</p>
              <p className="mt-0.5 text-neutral-500">A. 회원가입 또는 로그인 시 GitHub OAuth를 통해 자동으로 연동됩니다.</p>
            </li>
          </ul>
        </section>
        <section>
          <h2 className="title-sb-md mb-2">버그 및 오류 신고</h2>
          <p>서비스 이용 중 버그나 오류를 발견하셨다면 이메일 또는 GitHub 이슈로 제보해 주세요.</p>
          <p className="mt-2 text-neutral-500">빠른 시일 내에 확인 후 조치하겠습니다.</p>
        </section>
      </div>
    </div>
  )
}

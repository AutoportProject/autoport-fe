export default function Page() {
  return (
    <div className="space-y-6 p-10">
      {/* 가이드의 맨 위 Bold 32px 스타일 */}
      <h1 className="title-bold">
        나만의 개발 스토리를 담는 포트폴리오 서비스
      </h1>

      {/* 가이드의 Body SemiBold 20px 스타일 */}
      <p className="body-sb">지금 바로 시작해 가능성을 확장해 보세요.</p>

      {/* 가이드의 Caption Medium 16px 스타일 */}
      <span className="caption-m-sm text-muted-foreground">
        * 이용 약관 및 상세 설명
      </span>
    </div>
  );
}

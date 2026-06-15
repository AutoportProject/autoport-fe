# AutoPort Frontend

GitHub 저장소를 분석하고 AI가 생성한 포트폴리오 결과를 사용자가 확인, 저장, 수정, 공유할 수 있도록 구현한 AutoPort 프론트엔드입니다.

## 담당 역할

## 정민서

GitHub 연동 흐름, 포트폴리오 수정/공유 화면, 프론트엔드 상태 관리와 API 연동을 담당했습니다.

### 주요 구현 내용

#### 인증 및 사용자 화면

- 이메일 로그인 화면 구현
- 이메일 회원가입 화면 구현
- GitHub 회원가입 및 로그인 진입 화면 구현
- GitHub OAuth 콜백 처리 화면 구현
- 추가 정보 입력 및 가입 완료 화면 구현
- 로그인 사용자 정보 조회 흐름 연동

#### 포트폴리오 관리

- 포트폴리오 수정 화면 구현
- 포트폴리오 삭제 기능 연동
- 포트폴리오 공개 상태 표시
- 공유 링크 생성 기능 연동
- 공유 토큰 기반 비로그인 포트폴리오 조회 화면 구현

#### UI 및 사용자 경험

- Next.js App Router 기반 페이지 구조 구성
- Header, Footer, Logo 등 공통 레이아웃 컴포넌트 구현
- 버튼, 입력창 등 재사용 UI 컴포넌트 구성
- Tailwind CSS 기반 반응형 레이아웃 구현
- Pretendard 폰트 적용
- 포트폴리오 미리보기 화면 구성
- PDF 다운로드를 고려한 포트폴리오 화면 구조 작성

## 이채원

저장소 분석 화면, 포트폴리오 생성/조회 화면, 프론트엔드 상태 관리와 API 연동을 담당했습니다.

### 주요 구현 내용

#### GitHub 저장소 연동

- GitHub 저장소 목록 조회 화면 구현
- 저장소 선택 상태 관리 구현
- 선택한 저장소 분석 요청 API 연동
- 분석 결과 화면 구현
- 분석 결과가 없을 때 예외 화면 및 이전 화면 이동 처리

#### 저장소 분석 결과 표시

- 프로젝트 요약 표시
- 커밋 수, 스타 수, PR 리뷰 수, 중요도 점수 표시
- 기술 스택 표시
- README 요약 표시
- 활동 요약 표시
- 개발 기간 및 주요 언어 표시
- 최근 커밋 메시지 표시

#### AI 포트폴리오 생성

- 저장소 분석 결과를 기반으로 포트폴리오 생성 API 연동
- 사용자가 입력한 강조점을 포트폴리오 생성 요청에 반영
- AI 생성 결과를 프론트엔드에서 사용할 수 있는 포트폴리오 데이터 구조로 변환
- 생성된 포트폴리오를 저장 API와 연결
- 생성 완료 후 포트폴리오 미리보기 화면으로 이동 처리

#### 포트폴리오 관리

- 내 포트폴리오 목록 조회 화면 구현
- 포트폴리오 상세 조회 화면 구현
---


## 기술 스택

| 구분 | 기술 |
| --- | --- |
| Framework | <img src="https://img.shields.io/badge/Next.js%2016-000000?style=flat-square&logo=nextdotjs&logoColor=white" /> |
| Library | <img src="https://img.shields.io/badge/React%2019-61DAFB?style=flat-square&logo=react&logoColor=000000" /> |
| Language | <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" /> |
| Styling | <img src="https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" /> |
| UI Components | <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white" /> <img src="https://img.shields.io/badge/Radix%20UI-161618?style=flat-square&logo=radixui&logoColor=white" /> |
| State Management | <img src="https://img.shields.io/badge/Zustand-443E38?style=flat-square&logo=react&logoColor=white" /> |
| API Client | <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white" /> |
| Icons | <img src="https://img.shields.io/badge/Lucide%20React-F56565?style=flat-square&logo=lucide&logoColor=white" /> |
| PDF / Capture | <img src="https://img.shields.io/badge/jsPDF-FF0000?style=flat-square&logo=adobeacrobatreader&logoColor=white" /> <img src="https://img.shields.io/badge/html2canvas--pro-4B5563?style=flat-square&logo=html5&logoColor=white" /> |
| Code Quality | <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white" /> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=000000" /> |
| Package Manager | <img src="https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white" /> |

## 프로젝트 구조

```text
src
├── app              # Next.js App Router 페이지와 레이아웃
├── assets           # 폰트 등 정적 자산
├── components       # 공통 UI 및 레이아웃 컴포넌트
├── features         # 도메인별 화면 컴포넌트
├── hooks            # API 호출 및 화면 로직 커스텀 훅
├── lib              # API 함수, Axios 설정, 유틸 함수
├── store            # Zustand 전역 상태 관리
└── types            # 공통 타입 정의
```

## 시작하기

### 요구사항

- Node.js
- pnpm
- AutoPort 백엔드 서버

### 환경변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 백엔드 API 주소를 설정합니다.

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 의존성 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

기본 실행 주소는 다음과 같습니다.

```text
http://localhost:3000
```

### 빌드

```bash
pnpm build
```

### 프로덕션 실행

```bash
pnpm start
```

### 린트 검사

```bash
pnpm lint
```

## 주요 화면

- `/` : 서비스 시작 화면
- `/login` : 로그인 화면
- `/signup` : 회원가입 방식 선택 화면
- `/signup/email` : 이메일 회원가입 화면
- `/signup/info` : 추가 정보 입력 화면
- `/signup/complete` : 회원가입 완료 화면
- `/auth/github/callback` : GitHub OAuth 콜백 처리 화면
- `/home` : 로그인 후 홈 화면
- `/home/repos` : GitHub 저장소 목록 화면
- `/home/repos/analyze` : 저장소 분석 결과 화면
- `/home/repos/analyze/emphasis` : 포트폴리오 강조점 입력 화면
- `/home/repos/analyze/portfolio` : 생성된 포트폴리오 확인 화면
- `/home/my` : 내 정보 및 내 포트폴리오 진입 화면
- `/portfolio` : 포트폴리오 목록 화면
- `/portfolio/[portfolioId]/edit` : 포트폴리오 수정 화면
- `/portfolio/share/[shareToken]` : 공유 포트폴리오 조회 화면

## API 연동

프론트엔드는 `NEXT_PUBLIC_API_URL`을 기준으로 백엔드 서버와 통신합니다.

- `/api/github/repos`: GitHub 저장소 목록 조회
- `/api/github/analyze`: 선택한 저장소 분석
- `/api/portfolio/generate`: 분석 결과 기반 AI 포트폴리오 생성
- `/api/portfolio`: 포트폴리오 저장 및 목록 조회
- `/api/portfolio/{portfolioId}`: 포트폴리오 상세 조회, 수정, 삭제
- `/api/portfolio/{portfolioId}/share`: 공유 링크 생성
- `/api/portfolio/share/{shareToken}`: 공유 토큰 기반 공개 포트폴리오 조회

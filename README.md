# 🚀 Autoport Frontend

> 나만의 개발 스토리를 담는 포트폴리오 서비스

---

## 🛠 Tech Stack

### Framework & Library

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **State Management:** Zustand
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Package Manager:** pnpm

### Design System

- **Font:** Pretendard (Variable Font)
- **Icons:** Lucide React
- **Typography:** Custom Design Token (Title, Body, Caption) 기반 시스템 구축

---

## 📂 Project Structure

확장성과 관심사 분리를 위해 **Feature-Driven** 아키텍처를 지향합니다.

```text
src/
├── app/              # Next.js App Router (Pages & Layouts)
├── assets/           # 정적 자산 (Fonts, Images 등)
├── components/
│   ├── ui/           # shadcn/ui 원자 단위 컴포넌트
│   ├── common/       # 전역 공통 컴포넌트
│   └── layout/       # Header, Footer 등 레이아웃 컴포넌트
├── features/         # 도메인별 핵심 기능 및 비즈니스 로직
├── hooks/            # 커스텀 훅
├── store/            # Zustand 전역 상태 저장소
├── types/            # 공통 타입 정의
└── lib/              # 유틸리티 함수 및 외부 라이브러리 설정
```

---

## ⚙️ Convention & Tools

### 1. Code Quality

- **ESLint:** Next.js Core Web Vitals 최적화 설정
- **Prettier:** 코드 포맷팅 자동화 및 Tailwind 클래스 자동 정렬
- **VS Code:** `formatOnSave` 설정을 통한 개발 생산성 향상

### 2. Typography System

가독성 최적화를 위해 Line-height 130% 를 일괄 적용합니다.

| Category    | Size               | Weight            |
| :---------- | :----------------- | :---------------- |
| **Title**   | 32px / 24px / 22px | Bold / SemiBold   |
| **Body**    | 20px               | SemiBold / Medium |
| **Caption** | 20px / 16px        | Medium            |

---

## 🚀 Getting Started

### 1. Installation

```bash
pnpm install
```

### 2. Development

```bash
pnpm dev
```

### 3. Build & Start

```bash
pnpm build
pnpm start
```

---

## 📝 Commit Convention

일관된 프로젝트 관리를 위해 아래의 커밋 규칙을 준수합니다.

- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **design**: UI 디자인 변경 (CSS, 폰트, 레이아웃 등 시각적 수정)
- **style**: 코드 포맷팅 (세미콜론, 들여쓰기 등 코드 의미에 영향이 없는 수정)
- **refactor**: 코드 리팩토링 (기능은 그대로, 코드 구조 개선)
- **docs**: 문서 수정 (README 등)
- **chore**: 설정 변경 (패키지 설치, 빌드 설정 등 비즈니스 로직 외 작업)

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

````text
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

---

## 🚀 Getting Started

### 1. Installation
```bash
pnpm install

### 2. Development
```bash
pnpm dev

### 3. Build & Start
```bash
pnpm build
pnpm start
````

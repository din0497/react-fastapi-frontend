# 레스토랑 관리 프론트엔드

실시간 주문 추적, 다국어 지원 및 반응형 디자인을 갖춘 React 기반 레스토랑 관리 시스템입니다. 레스토랑 직원과 고객에게 원활한 경험을 제공하기 위해 최신 웹 기술로 구축되었습니다.

## 주요 기능

- 실시간 주문 관리 및 추적
- 다국어 지원 (영어, 한국어)
- 고객과 레스토랑 직원을 위한 개별 대시보드
- 실시간 업데이트를 위한 WebSocket 통합
- Tailwind CSS를 사용한 반응형 디자인

## 기술 스택

- React 19
- TypeScript
- 상태 관리를 위한 Redux Toolkit
- 빌드 도구로서의 Vite
- 스타일링을 위한 Tailwind CSS
- 국제화를 위한 i18next
- 실시간 업데이트를 위한 WebSocket

## 사전 요구사항

- Node.js (v18 이상)
- npm 또는 yarn
- 실행 중인 백엔드 서비스

## 프로젝트 구조

```
src/
├── app/
│   ├── components/
│   │   ├── common/         # 공유 컴포넌트
│   │   ├── forms/          # 폼 컴포넌트
│   │   ├── providers/      # 컨텍스트 제공자
│   │   └── tables/         # 테이블 컴포넌트
│   ├── screens/           # 메인 페이지 컴포넌트
│   └── store/             # Redux 스토어와 슬라이스
├── libs/
│   ├── types/             # TypeScript 타입
│   └── config.ts          # 앱 설정
├── locales/               # i18n 번역 파일
└── services/              # API 서비스
```

## 설치

1. 저장소 클론하기:
```bash
git clone https://github.com/din0497/react-fastapi-frontend.git
cd react-fastapi-frontend
```

2. 의존성 설치:
```bash
npm install
# 또는
yarn
```

## 사용 가능한 스크립트

- `npm run dev` - 개발 서버 시작
- `npm run build` - 프로덕션 빌드 생성
- `npm run preview` - 프로덕션 빌드 미리보기
- `npm run lint` - ESLint 실행

## 핵심 컴포넌트

### WebSocket 통합
애플리케이션은 WebSocketProvider를 통해 실시간 업데이트를 위한 WebSocket을 사용합니다:

```typescript
// app/components/providers/WebSocketProvider.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const WebSocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WS_URL);
    // WebSocket 연결 로직
    return () => ws.close();
  }, []);

  return children;
};
```

### 주문 관리
주문은 전용 컴포넌트와 Redux 슬라이스를 통해 처리됩니다:

```typescript
// app/store/slices/orderSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null
  },
  reducers: {
    // 주문 관리 리듀서
  }
});
```

### 국제화
애플리케이션은 i18next를 사용하여 다중 언어를 지원합니다:

```typescript
// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import koTranslation from './locales/ko.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ko: { translation: koTranslation }
    },
    lng: 'en',
    fallbackLng: 'en'
  });
```

## 개발 가이드라인

1. **컴포넌트 구조**
   - 공유 컴포넌트는 `app/components/common`에 배치
   - 새로운 화면은 `app/screens`에 생성
   - 비즈니스 로직은 서비스에 유지

2. **상태 관리**
   - 전역 상태에는 Redux 사용
   - 컴포넌트별 데이터에는 로컬 상태 사용
   - WebSocket 상태는 전용 슬라이스를 통해 관리

3. **스타일링**
   - Tailwind CSS 유틸리티 클래스 사용
   - 반복되는 UI 패턴을 위한 공통 컴포넌트 생성
   - 반응형 디자인 원칙 준수

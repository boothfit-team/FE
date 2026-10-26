# 부스핏 프런트엔드

React + TypeScript + Vite + Tailwind CSS v4.

```sh
npm install
npm run dev
```

기본 화면은 방문자 홈 화면입니다. 공통 컴포넌트 갤러리는 `/?preview=components`에서 확인합니다.

홈 화면은 `src/features/home`에서 관리하며 임시 데이터는 `home.mock.ts`에 분리했습니다. API 연동 전까지 날짜·카테고리 필터와 부스 선택은 로컬 상태로 동작합니다. 예약·초대·상세 페이지 진입은 준비 중 안내를 표시합니다. 행사 날짜는 Figma 초안을 기준으로 합니다.

컴포넌트 목록, props, Figma 대응 화면과 공통화 기준은 [컴포넌트 가이드](docs/components.md)를 참고하세요.

검사: `npm run build`, `npm run lint`, `npm test`, `npm run test:ui`.

앱과 Git 저장소의 루트는 `FE`입니다. 이 폴더에서 위 명령을 실행합니다.

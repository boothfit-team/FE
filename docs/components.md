# 부스핏 공통 UI

Figma: https://www.figma.com/design/LKlQsb45w3wTCJsOGJikHZ

## 실행

프로젝트와 Git 저장소 루트는 `C:\boothfit\FE`입니다. 이 폴더에서 설치·개발·검사를 실행합니다.

```sh
npm install
npm run dev
npm run build
npm run lint
npm test
npm run test:ui
```

- `/`: 컴포넌트 갤러리
- `/?preview=visitor`: 방문자 부스 목록 및 예약 예시
- `/?preview=operator`: 운영자 대기열 예시
- `/?preview=admin`: 관리자 행사 입력 예시

미리보기 데이터와 동작은 `src/demo`에 있습니다. 서버 저장, 실제 예약·승인·노쇼 처리는 포함하지 않습니다.
공통 컴포넌트에는 API 호출, 라우터, 사용자 인증 상태를 넣지 않았습니다.

## 구조와 공통화 기준

| 위치 | 컴포넌트 | Figma 기준 |
| --- | --- | --- |
| ui/Button | Button | 전체 화면의 primary, secondary, outline, danger 버튼 |
| ui/Badge | Badge, StatusIndicator | 카테고리·확정·운영 상태 |
| ui/Card | Card, Divider, Notice, StatCard | 전체 카드·안내, ADMIN-07 통계 |
| ui/Fields | Input, Textarea, Select | OPERATOR-07/08, ADMIN-02 입력 |
| ui/Selection | ChipGroup, Stepper | VISITOR-01/02 필터, VISITOR-05 인원 |
| ui/BottomSheet | BottomSheet | VISITOR-11 후기, OPERATOR-06 휴식, ADMIN-09 확인 |
| layout/AppLayout | AppHeader, DetailHeader, BottomNavigation, AppShell | 공통 헤더, VISITOR-03/04 상세 헤더, 역할별 하단 메뉴 |
| layout/Headings | PageHeading, SectionHeading, EventSelector | 공통 제목, 운영자·관리자 행사 선택 |
| booth/BoothCard | BoothCard, SelectedBoothCard | VISITOR-02 목록, VISITOR-05 선택 |
| reservation/ReservationCard | ReservationCard, ItineraryCard | VISITOR-07 예약, VISITOR-14 일정 |
| queue/QueueCard | QueueCard | OPERATOR-01 현재 팀·다음 순번 |
| review/ReviewCard | ReviewCard | VISITOR-04 후기 |

방문자 15개, 운영자 9개, 관리자 9개 화면의 레이어 구조를 검토하고, 대표 화면의 상세 디자인 데이터에서 반복 UI를 추출했습니다.
카드들은 공통 Card를 조합하되, 서로 다른 데이터·동작을 가진 예약/부스/대기열을 별도 컴포넌트로 유지합니다.
QR 생성, 카카오 로그인, 파일 업로드 처리는 개별 기능 작업에서 연결합니다.

## 디자인 토큰

`src/index.css`의 Tailwind v4 `@theme`에 Figma 색상·폰트·타이포·모서리를 정의했습니다.
예: `bg-brand`, `text-muted`, `border-line`, `rounded-control`, `text-body`.
기준 너비는 430px, 좌우 여백은 18px이고 좁은 화면에서는 유연하게 줄어듭니다.
Noto Sans KR 400/700은 npm 패키지에서 번들링하여 외부 폰트 CDN 없이 제공합니다.
Tailwind Vite 설정은 [공식 설치 문서](https://tailwindcss.com/docs/installation/using-vite)를 따릅니다.

## 사용 예시

```tsx
import { Button, Input, Badge, BoothCard } from './components'

<Button variant="secondary" size="md" onClick={handleDetails}>
  자세히 보기
</Button>
<Input label="부스 이름" value={name} onChange={e => setName(e.target.value)} />
<Badge tone="warning">예약 확정</Badge>
<BoothCard
  title={booth.name}
  category={booth.category}
  location={booth.location}
  poster={<img src={booth.posterUrl} alt={booth.name + ' 포스터'} className="aspect-[3/4] w-[70%] object-contain" />}
  selected={selected}
  onSelect={() => setSelected(!selected)}
/>
```

- Button: `variant` = primary / secondary / outline / danger / ghost; `size` = sm / md / lg. `loading`일 때 중복 클릭을 막습니다.
- Badge/StatusIndicator: `tone` = neutral / brand / success / warning / danger. 상태 문구는 호출부에서 전달합니다.
- Input/Select/Textarea: label, hint, error, containerClassName 및 기본 HTML 속성을 지원합니다. label-id 연결, 오류 설명, disabled 상태를 제공합니다.
- ChipGroup: 단일 선택 radio 그룹입니다. 방향키로 선택할 수 있습니다. 여러 부스 선택은 별도 SelectedBoothCard를 사용합니다.
- Stepper: controlled 컴포넌트입니다. 호출부에서 min ≤ value ≤ max인 값을 전달하고 min/max를 지정하세요.
- AppShell: header / navigation 슬롯을 받습니다. 페이지 콘텐츠는 children으로 조합합니다.
- BottomNavigation: role별 항목을 제공하며 activeId / onNavigate를 받습니다. 실제 라우팅은 호출부에서 연결합니다.
- AppHeader: onLargeTextChange를 전달하면 큰 글씨 버튼, onProfileClick을 전달하면 프로필 버튼을 표시합니다.
- BottomSheet: controlled open / onClose 및 title, description, footer 슬롯을 받습니다. native dialog로 포커스를 가두고 ESC·바깥 클릭으로 닫으며 닫은 뒤 기존 포커스를 복원합니다.
- className 병합은 tailwind-merge를 사용합니다. 모든 도메인 카드의 동작은 callback 또는 actions 슬롯으로 전달합니다.

## 확인이 필요한 디자인 규칙

- 같은 상태가 중립색 또는 초록색 배지로 섞여 있습니다. 공통 UI는 tone을 받아 처리하며, 상태별 최종 색상 매핑은 아직 고정하지 않았습니다.
- 하단 메뉴 아이콘은 초안의 텍스트 기호를 그대로 사용했습니다. 확정된 SVG 아이콘 세트가 생기면 교체할 수 있습니다.
- 포스터는 동적 슬롯입니다. 미리보기의 텍스트 포스터는 Figma의 편집 가능한 사각형·텍스트 레이어를 재현한 예시입니다.
- 큰 글씨 모드의 별도 시안이 없어 공통 타이포 토큰을 확대하고 내용 높이는 자연스럽게 늘어나도록 했습니다.
- AppHeader와 DetailHeader를 분리했습니다. 부스 상세·후기 화면의 뒤로 가기/닫기 요구가 다르기 때문입니다.

## 검증

CI는 저장소 루트에서 `npm ci`, `npm run lint`, `npm test`, `npm run build`를 실행합니다. Vitest는 src 아래 단위 테스트만 실행하고 Playwright 브라우저 검사는 별도로 실행합니다.

`npm run test:ui`는 Chrome에서 모바일 오버플로, 필터/선택, 인원 경계, 모달 포커스/ESC, 역할별 메뉴와 행사 폼을 확인합니다.
Chrome이 없으면 `PLAYWRIGHT_CHANNEL=msedge` 등 설치된 브라우저 채널을 지정하거나 Chromium을 설치하세요.

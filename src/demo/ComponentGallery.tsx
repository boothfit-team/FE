import { useState } from 'react'
import type { ReactNode } from 'react'
import { AppHeader, Badge, BottomNavigation, BottomSheet, Button, Card, ChipGroup, DetailHeader, Divider, EventSelector, Input, ItineraryCard, Notice, QueueCard, ReservationCard, ReviewCard, SectionHeading, SelectedBoothCard, StatCard, StatusIndicator, Stepper, Textarea, Select } from '../components'

function Example({ title, children }: { title: string; children: ReactNode }) {
  return <section className="space-y-4"><SectionHeading title={title} /><Card className="space-y-4 p-5">{children}</Card></section>
}
export default function ComponentGallery() {
  const [category, setCategory] = useState('전체')
  const [people, setPeople] = useState(1)
  const [selected, setSelected] = useState(true)
  const [open, setOpen] = useState(false)
  const [large, setLarge] = useState(false)
  const [active, setActive] = useState('explore')
  const [event, setEvent] = useState('festival')
  return <div className={large ? 'large-text' : undefined}>
    <header className="border-b border-line bg-white px-5 py-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-caption font-bold tracking-[0.16em] text-brand">BOOTHFIT / UI LIBRARY</p>
        <h1 className="mt-3 text-3xl font-bold">공통 컴포넌트</h1>
        <p className="mt-3 text-body text-muted">Figma 초안 기반 · React + Tailwind CSS · 화면을 구성하는 공통 UI와 사용 예시</p>
        <nav aria-label="역할별 미리보기" className="mt-5 flex flex-wrap gap-2">
          {([['visitor', '방문자 화면'], ['operator', '운영자 화면'], ['admin', '관리자 화면']] as const).map(([role, label]) =>
            <a key={role} href={'?preview=' + role} className="rounded-control bg-brand-soft px-4 py-2 text-body font-bold text-brand">{label} ↗</a>)}
        </nav>
      </div>
    </header>
    <main className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-2">
      <Example title="버튼 / Button">
        <div className="flex flex-wrap gap-2"><Button>예약하기</Button><Button variant="secondary">자세히 보기</Button><Button variant="outline">돌아가기</Button><Button variant="danger">예약 취소</Button><Button variant="ghost">더 보기</Button></div>
        <div className="flex flex-wrap items-center gap-2"><Button size="sm">작은 버튼</Button><Button size="lg">큰 버튼</Button><Button disabled>비활성화</Button><Button loading>저장 중</Button></div>
        <Button fullWidth onClick={() => setOpen(true)}>확인 바텀시트 열기</Button>
      </Example>
      <Example title="배지·상태·안내 / Badge · Notice">
        <div className="flex flex-wrap gap-2"><Badge>체험</Badge><Badge tone="brand">선택됨</Badge><Badge tone="success">체험 완료</Badge><Badge tone="warning">예약 확정</Badge><Badge tone="danger">운영 종료</Badge></div>
        <div className="flex flex-wrap gap-4"><StatusIndicator>운영 중</StatusIndicator><StatusIndicator tone="warning">휴식 중</StatusIndicator><StatusIndicator tone="neutral">종료</StatusIndicator></div>
        <Notice>관리자가 승인하기 전에는 방문자 탐색과 예약 화면에 부스가 보이지 않습니다.</Notice>
        <Notice tone="warning">운영 시간과 이동 간격을 확인해 순서를 배정해요.</Notice>
      </Example>
      <Example title="입력 / Input · Select · Textarea">
        <Input label="부스 이름" placeholder="부스 이름을 입력해 주세요" />
        <div className="grid grid-cols-2 gap-4"><Input label="운영 날짜" type="date" defaultValue="2026-10-16" /><Input label="부스 시작" type="time" defaultValue="11:00" /></div>
        <Select label="카테고리" defaultValue="체험"><option>체험</option><option>게임</option><option>만들기</option><option>전시</option></Select>
        <Textarea label="부스 소개" placeholder="체험 내용과 주의사항을 입력해 주세요" hint="줄바꿈을 포함할 수 있어요." />
        <Input label="초대 코드" defaultValue="AB" error="초대 코드를 다시 확인해 주세요." />
        <Input label="변경할 수 없는 값" defaultValue="선택한 행사" disabled />
      </Example>
      <div className="space-y-8">
        <Example title="선택 / ChipGroup · Stepper">
          <ChipGroup label="부스 카테고리" options={['전체', '체험', '게임', '만들기', '전시'].map(value => ({ value, label: value }))} value={category} onChange={setCategory} />
          <p className="text-label text-muted" aria-live="polite">선택한 카테고리: {category}</p>
          <Divider /><Stepper label="예약 인원" value={people} min={1} max={2} onChange={setPeople} />
        </Example>
        <Example title="요약 / StatCard">
          <div className="grid grid-cols-2 gap-2"><StatCard label="운영 부스" value={12} suffix="개" /><StatCard label="유효 예약" value={28} suffix="건" /></div>
        </Example>
      </div>
      <Example title="예약·일정 / ReservationCard · ItineraryCard">
        <ReservationCard title="미래를 그리는 AI" category="체험" location="학생회관 앞 A-01" dateTime="10월 16일 금요일 · 13:20" description="예상 체험 20분 · 2명 · 입장 5분 전 알림 예정"
          actions={<><Button variant="secondary" size="sm" onClick={() => setOpen(true)}>예약 정보</Button><Button variant="danger" size="sm" onClick={() => setOpen(true)}>예약 취소</Button></>} />
        <ItineraryCard order={1} time="13:20–13:40" title="미래를 그리는 AI" location="학생회관 앞 A-01 · 20분 체험" />
      </Example>
      <Example title="선택·대기열 / SelectedBoothCard · QueueCard">
        <SelectedBoothCard title="미래를 그리는 AI" location="학생회관 앞 A-01" category="체험" duration={20} priority="꼭 방문" selected={selected} onToggle={() => setSelected(!selected)} />
        <QueueCard name="선배A · 미래를 그리는 AI" description="12:45 입장 · 20분 체험" status="진행 중" current
          actions={<><Button onClick={() => setOpen(true)}>다음 팀 받기</Button><Button variant="danger" onClick={() => setOpen(true)}>노쇼 처리</Button></>} />
      </Example>
      <Example title="헤더·내비게이션 / Layout">
        <AppHeader largeText={large} onLargeTextChange={setLarge} onProfileClick={() => setOpen(true)} onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        <EventSelector events={[{ id: 'festival', name: '2026 캠퍼스 학술제' }, { id: 'spring', name: '2027 봄 학술제' }]} value={event} onChange={setEvent} />
        <BottomNavigation role="visitor" activeId={active} onNavigate={setActive} />
        <DetailHeader title="부스 상세" onBack={() => setOpen(true)} onClose={() => setOpen(true)} />
      </Example>
      <Example title="후기 / ReviewCard">
        <ReviewCard author="민*" date="2026.10.16" rating={4.5}>직접 포스터를 만들어볼 수 있어서 좋았어요.</ReviewCard>
      </Example>
    </main>
    <BottomSheet open={open} onClose={() => setOpen(false)} title="미래를 그리는 AI · 휴식 중" description="선택한 행사: 2026 캠퍼스 학술제 · 10월 16일"
      footer={<><Button variant="secondary" onClick={() => setOpen(false)}>돌아가기</Button><Button onClick={() => setOpen(false)}>휴식 중 확정</Button></>}>
      <Notice>신규 접수만 즉시 막고 예약 2건은 그대로 진행합니다.<br />마지막 팀 종료 후 자동 휴식 상태가 됩니다.</Notice>
      <Input label="휴식 종료 시각" type="time" defaultValue="14:25" />
      <p className="text-label text-muted">확정 대기열이 끝나는 14:05부터 휴식합니다.</p>
    </BottomSheet>
  </div>
}

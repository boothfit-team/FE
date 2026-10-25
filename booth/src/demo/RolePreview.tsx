import { useState } from 'react'
import type { FormEvent } from 'react'
import { AppHeader, AppShell, Badge, BoothCard, BottomNavigation, BottomSheet, Button, Card, ChipGroup, EventSelector, Input, Notice, PageHeading, QueueCard, ReservationCard, SectionHeading, StatCard, navigationItems } from '../components'
import type { UserRole } from '../components'

const events = [{ id: 'festival', name: '2026 캠퍼스 학술제' }, { id: 'spring', name: '2027 봄 학술제' }]
const categories = ['전체', '체험', '게임', '만들기', '전시'].map(value => ({ value, label: value }))
// The source poster is made of editable text and rectangles, rather than an image asset.
function DemoPoster() {
  return <div className="relative aspect-[3/4] w-[70%] shrink-0 border-t-[9px] border-poster-accent bg-poster p-[14px] text-white">
    <p className="text-[9px] font-bold">2026 CAMPUS FESTIVAL</p>
    <p className="mt-5 text-[27px] leading-snug font-bold">미래를 그리는 AI</p>
    <div className="absolute inset-x-[14px] bottom-[18px] space-y-1 border-t border-line pt-2 text-[9px]">
      <p className="font-bold">학생회관 앞 A-01</p><p>10월 16일 · 10월 17일</p>
    </div>
  </div>
}
export default function RolePreview({ role }: { role: UserRole }) {
  const [active, setActive] = useState<string>(navigationItems[role][0].id)
  const [large, setLarge] = useState(false)
  const [event, setEvent] = useState('festival')
  const [category, setCategory] = useState('전체')
  const [selected, setSelected] = useState(false)
  const [sheet, setSheet] = useState<'profile' | 'details' | 'cancel' | 'next' | 'no-show' | null>(null)
  const [reserved, setReserved] = useState(true)
  const [team, setTeam] = useState(0)
  const [arrived, setArrived] = useState(false)
  const [dates, setDates] = useState(['2027-04-15', '2027-04-16'])
  const [message, setMessage] = useState('')
  function saveEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (String(data.get('start')) >= String(data.get('end'))) { setMessage('종료 시각은 시작 시각보다 늦게 설정해 주세요.'); return }
    setMessage('미리보기: ' + String(data.get('name')) + ' 행사 입력을 확인했어요.')
  }
  const currentName = navigationItems[role].find(item => item.id === active)?.label ?? ''
  return <AppShell largeText={large} header={<AppHeader largeText={large} onLargeTextChange={setLarge} onProfileClick={() => setSheet('profile')} onHomeClick={() => setActive(navigationItems[role][0].id)} />}
    navigation={<BottomNavigation role={role} activeId={active} onNavigate={id => { setActive(id); setMessage('') }} />}>
    {role !== 'visitor' && <EventSelector events={events} value={event} onChange={setEvent} />}
    {role === 'visitor' && active === 'explore' && <>
      <div className="pt-3"><SectionHeading title="오늘의 부스" trailing="12개 운영 가능" /></div>
      <ChipGroup label="부스 카테고리" options={categories} value={category} onChange={setCategory} />
      {category === '전체' || category === '체험' ?
        <BoothCard title="미래를 그리는 AI" category="체험" location="학생회관 앞 A-01" description="AI로 나만의 캠퍼스 포스터를 만드는 인터랙티브 부스" poster={<DemoPoster />}
          status={{ label: '운영 중', tone: 'success' }} metrics={['대기 약 28분', '체험 20분', '예약 2건', '★ 4.5 (2)']} selected={selected} onSelect={() => setSelected(!selected)} onDetails={() => setSheet('details')} /> :
        <Notice>이 미리보기에는 체험 부스 한 개가 준비되어 있어요.</Notice>}
      {selected && <Notice>미래를 그리는 AI를 선택했어요.</Notice>}
    </>}
    {role === 'visitor' && active === 'reservations' && <>
      <PageHeading eyebrow="MY ROUTE" title="내 예약" description="여러 부스의 입장 시간이 겹치지 않도록 배정했어요." />
      <SectionHeading title="확정된 일정" trailing={reserved ? '1건' : '0건'} />
      {reserved ? <ReservationCard title="미래를 그리는 AI" category="체험" location="학생회관 앞 A-01" dateTime="10월 16일 금요일 · 13:20" description="예상 체험 20분 · 2명 · 입장 5분 전 알림 예정"
        actions={<><Button size="sm" variant="secondary" onClick={() => setSheet('details')}>예약 정보</Button><Button size="sm" variant="danger" onClick={() => setSheet('cancel')}>예약 취소</Button></>} /> : <Notice>예약이 없습니다.</Notice>}
    </>}
    {role === 'visitor' && active === 'vacancies' && <><PageHeading eyebrow="OPEN SEATS" title="빈자리 알림" description="참여할 수 있는 부스의 빈자리를 확인해요." /><Notice>현재 표시할 빈자리 알림이 없습니다.</Notice></>}
    {role === 'operator' && <>
      <PageHeading eyebrow="BOOTH OPERATIONS" title={currentName} description="예약 순서에 따라 다음 팀을 입장시켜요." />
      {active === 'queue' ? <>
        <Input label="운영 날짜" type="date" defaultValue="2026-10-16" />
        <QueueCard name={(team === 0 ? '선배A' : '선배B') + ' · 미래를 그리는 AI'} description="12:45 입장 · 20분 체험" status="진행 중" current
          actions={<><Button disabled={team > 0} onClick={() => setSheet('next')}>다음 팀 받기</Button><Button variant="danger" disabled={team > 0} onClick={() => setSheet('no-show')}>노쇼 처리</Button></>} />
        <SectionHeading title="다음 순번" trailing={team === 0 ? '1팀 대기' : '0팀 대기'} />
        {team === 0 ? <QueueCard name="선배B" description="13:05 예약 · 1명" status={arrived ? '도착 완료' : '도착 확인'}
          actions={<Button variant="secondary" disabled={arrived} onClick={() => setArrived(true)}>{arrived ? '도착 완료' : '도착 표시'}</Button>} /> : <Notice>대기 중인 팀이 없습니다.</Notice>}
      </> : <Notice>공통 컴포넌트 미리보기입니다. 부스 관리·등록 폼의 입력 UI는 컴포넌트 목록에서 확인할 수 있어요.</Notice>}
    </>}
    {role === 'admin' && <>
      <PageHeading eyebrow="EVENT ADMIN" title={active === 'events' ? '새 행사 만들기' : currentName} description={active === 'events' ? '행사의 운영 일정을 먼저 정해요.' : '선택한 행사의 부스를 확인해요.'} />
      {active === 'events' ? <form onSubmit={saveEvent} className="space-y-5 pt-1">
        <Input label="행사 이름" name="name" required defaultValue="2027 봄 학술제" />
        {dates.map((date, index) => <Input key={index} label={'운영 날짜 ' + (index + 1)} type="date" required value={date} onChange={event => setDates(dates.map((value, i) => i === index ? event.target.value : value))} />)}
        <Button variant="secondary" fullWidth onClick={() => setDates([...dates, ''])}>＋ 날짜 추가</Button>
        <div className="grid grid-cols-2 gap-[18px]"><Input label="전체 시작" name="start" type="time" required defaultValue="10:00" /><Input label="전체 종료" name="end" type="time" required defaultValue="17:00" /></div>
        <Button type="submit" size="lg" fullWidth className="mt-5">행사 생성·선택</Button>
      </form> : active === 'overview' ? <div className="grid grid-cols-2 gap-2"><StatCard label="운영 부스" value={12} /><StatCard label="유효 예약" value={28} /><StatCard label="체험 완료" value={16} /><StatCard label="빈자리 공지" value={2} /></div> :
        <Card className="space-y-3"><Badge tone="warning">승인 대기</Badge><h2 className="text-section font-bold">미래를 그리는 AI</h2><p className="text-label text-muted">학생회관 앞 A-01 · 운영자A</p><Button variant="secondary" onClick={() => setSheet('details')}>상세 보기</Button></Card>}
    </>}
    {message && <Notice role="status">{message}</Notice>}
    <BottomSheet open={sheet !== null} onClose={() => setSheet(null)} title={sheet === 'cancel' ? '예약을 취소할까요?' : sheet === 'profile' ? '내 프로필' : sheet === 'next' ? '다음 팀을 입장시킬까요?' : sheet === 'no-show' ? '노쇼로 처리할까요?' : '미래를 그리는 AI'}
      footer={<><Button variant="secondary" onClick={() => setSheet(null)}>돌아가기</Button>{sheet !== 'profile' && <Button onClick={() => {
        if (sheet === 'cancel') setReserved(false)
        if (sheet === 'next' || sheet === 'no-show') setTeam(1)
        setSheet(null)
      }}>확인</Button>}</>}>
      <Notice>{sheet === 'profile' ? '민 · 공통 컴포넌트 미리보기' : sheet === 'cancel' ? '취소한 예약은 내 예약 목록에서 사라집니다.' : '공통 컴포넌트 동작 확인용 예시입니다. 서버에는 저장하지 않습니다.'}</Notice>
    </BottomSheet>
  </AppShell>
}

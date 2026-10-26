import { useState } from 'react'
import { AppHeader, AppShell, Badge, BoothCard, BottomNavigation, BottomSheet, Button, ChipGroup, Notice, SectionHeading } from '../../components'
import { BoothPoster } from './components/BoothPoster'
import { FestivalHero } from './components/FestivalHero'
import { VisitPreferences } from './components/VisitPreferences'
import { categoryOptions, festival, homeBooths } from './home.mock'
import type { CategoryFilter } from './home.types'

interface HomeNotice { title: string; description: string }

export default function HomePage() {
  const [largeText, setLargeText] = useState(false)
  const [date, setDate] = useState(festival.dates[0].value)
  const [departureTime, setDepartureTime] = useState(festival.departureTime)
  const [category, setCategory] = useState<CategoryFilter>('전체')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [notice, setNotice] = useState<HomeNotice | null>(null)
  const dayBooths = homeBooths.filter(booth => booth.dates.includes(date))
  const visibleBooths = dayBooths.filter(booth => category === '전체' || booth.category === category)
  const day = festival.dates.find(day => day.value === date)!
  function showComingSoon(title: string) {
    setNotice({ title, description: '이 화면은 준비 중이에요. 현재는 홈 화면에서 부스를 둘러보고 선택할 수 있어요.' })
  }
  function changeDate(nextDate: string) {
    setDate(nextDate)
    setSelectedIds([])
  }
  function toggleBooth(id: string) {
    setSelectedIds(previous => previous.includes(id) ? previous.filter(value => value !== id) : [...previous, id])
  }
  return <>
    <AppShell largeText={largeText} mainClassName="space-y-0 pt-[15px] pb-8"
      header={<AppHeader className="pl-5 pr-[9px]" largeText={largeText} onLargeTextChange={setLargeText} onProfileClick={() => showComingSoon('내 프로필')} onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />}
      navigation={<BottomNavigation role="visitor" activeId="explore" onNavigate={id => {
        if (id === 'explore') window.scrollTo({ top: 0, behavior: 'smooth' })
        else showComingSoon(id === 'reservations' ? '내 예약' : '빈자리 알림')
      }} />}>
      <section aria-label="행사 안내">
        <div className="mb-[13px] flex min-h-[38px] items-center justify-between gap-3">
          <Badge className="min-w-0 flex-1 px-2 max-w-[240px]">운영자로 초대받으셨나요?</Badge>
          <Button variant="secondary" className="min-h-[38px] w-[103px] shrink-0 px-3 py-1.5" onClick={() => showComingSoon('운영자 초대 입력')}>초대 입력</Button>
        </div>
        <FestivalHero festival={festival} dateLabel={day.shortLabel} />
      </section>
      <div className="mt-[13px]">
        <VisitPreferences festival={festival} date={date} departureTime={departureTime} onDateChange={changeDate} onDepartureTimeChange={setDepartureTime} />
      </div>
      <section aria-label="오늘의 부스" className="mt-[22px] space-y-[14px]">
        <SectionHeading title="오늘의 부스" trailing={dayBooths.length + '개 운영 가능'} />
        <ChipGroup label="부스 카테고리" options={categoryOptions} value={category} onChange={setCategory}
          className="[&_label]:max-w-[70px] [&_label>span]:py-0 [&_label>span]:leading-[25px]" />
        {selectedIds.length > 0 && <Notice role="status">선택한 부스 {selectedIds.length}개 · {day.label}{departureTime && ' · ' + departureTime + '까지 방문'}</Notice>}
        <div className="space-y-5" aria-live="polite" aria-atomic="false">
          {visibleBooths.map(booth => <BoothCard key={booth.id} title={booth.title} category={booth.category} location={booth.location} description={booth.description}
            poster={<BoothPoster booth={booth} festival={festival} />} status={{ label: '운영 중', tone: 'success' }}
            metrics={['대기 약 ' + booth.waitMinutes + '분', '체험 ' + booth.duration + '분', '예약 ' + booth.reservationCount + '건', '★ ' + booth.rating.toFixed(1) + ' (' + booth.reviewCount + ')']}
            selected={selectedIds.includes(booth.id)} onSelect={() => toggleBooth(booth.id)} onDetails={() => showComingSoon(booth.title + ' 상세')} />)}
          {visibleBooths.length === 0 && <Notice>선택한 날짜에 운영하는 부스가 없어요. 다른 날짜나 카테고리를 선택해 주세요.</Notice>}
        </div>
      </section>
      <BottomSheet open={notice !== null} onClose={() => setNotice(null)} title={notice?.title ?? ''} footer={<Button onClick={() => setNotice(null)}>확인</Button>}>
        <p className="text-body text-muted">{notice?.description}</p>
      </BottomSheet>
    </AppShell>
  </>
}

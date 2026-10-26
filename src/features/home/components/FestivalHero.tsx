import { Badge } from '../../../components'
import type { Festival } from '../home.types'

export function FestivalHero({ festival, dateLabel }: { festival: Festival; dateLabel: string }) {
  return <section aria-labelledby="home-title" className="min-h-[139px] rounded-[20px] bg-brand-soft px-[18px] pt-[17px] pb-[9px]">
    <p className="text-caption font-bold text-brand-strong">{festival.name} · {dateLabel}</p>
    <h1 id="home-title" className="mt-[6px] text-[22px] leading-[1.32] font-bold">기다림은 줄이고,<br />재미는 더 많이.</h1>
    <Badge tone="brand" className="mt-[4px] min-w-[170px]">여러 부스를 한 번에 예약</Badge>
  </section>
}

import type { ReactNode } from 'react'
import { Card, Divider } from '../ui/Card'
import { Badge, type Tone } from '../ui/Badge'

export function ReservationCard({ title, category, location, dateTime, description, status = '예약 확정', tone = 'warning', actions }: {
  title: string; category: string; location: string; dateTime: string; description?: string; status?: string; tone?: Tone; actions?: ReactNode
}) {
  return <Card className="space-y-3">
    <div className="flex justify-between gap-2"><Badge>{category}</Badge><Badge tone={tone}>{status}</Badge></div>
    <div><h3 className="text-section font-bold">{title}</h3><p className="mt-1 text-label text-muted">{location}</p></div>
    <p className="pt-1 text-[22px] font-bold">{dateTime}</p>
    {description && <p className="text-label text-muted">{description}</p>}
    {actions && <><Divider /><div className="flex flex-wrap gap-2">{actions}</div></>}
  </Card>
}
export function ItineraryCard({ order, time, title, location }: { order: number; time: string; title: string; location: string }) {
  return <Card className="space-y-2 rounded-[14px] p-[14px]">
    <div className="flex items-center gap-2"><Badge tone="brand">{String(order).padStart(2, '0')}</Badge><p className="font-bold">{time}</p></div>
    <h3 className="text-section font-bold">{title}</h3><p className="text-label text-muted">{location}</p>
  </Card>
}

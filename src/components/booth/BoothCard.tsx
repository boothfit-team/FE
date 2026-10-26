import type { ReactNode } from 'react'
import { Card } from '../ui/Card'
import { Badge, StatusIndicator, type Tone } from '../ui/Badge'
import { Button } from '../ui/Button'
import { cn } from '../../lib/cn'

export interface BoothCardProps {
  title: string
  category: string
  location: string
  description?: string
  poster?: ReactNode
  status?: { label: string; tone: Tone }
  metrics?: readonly string[]
  selected?: boolean
  disabled?: boolean
  onDetails?: () => void
  onSelect?: () => void
}
export function BoothCard({ title, category, location, description, poster, status, metrics, selected = false, disabled, onDetails, onSelect }: BoothCardProps) {
  return <Card className={cn('overflow-hidden p-0', selected && 'border-brand shadow-[0_8px_20px_rgba(36,61,150,0.09)]')}>
    {poster && <div className="flex justify-center overflow-hidden rounded-xl bg-poster-surface">{poster}</div>}
    <div className="space-y-3 p-[15px]">
      <div className="flex items-center justify-between gap-2"><Badge>{category}</Badge>{status && <StatusIndicator tone={status.tone}>{status.label}</StatusIndicator>}</div>
      <h3 className="text-[17px] font-bold">{title}</h3>
      <p className="text-label text-muted">⌖ {location}</p>
      {description && <p className="text-label text-muted">{description}</p>}
      {metrics && <div className="flex flex-wrap gap-1.5">{metrics.map(metric => <Badge key={metric}>{metric}</Badge>)}</div>}
      {(onDetails || onSelect) && <div className="flex gap-2">
        {onDetails && <Button variant="secondary" size="sm" className="flex-1" onClick={onDetails}>자세히 보기</Button>}
        {onSelect && <Button size="sm" className="flex-1" aria-pressed={selected} disabled={disabled} onClick={onSelect}>{selected ? '선택 해제' : '선택하기'}</Button>}
      </div>}
    </div>
  </Card>
}
export function SelectedBoothCard({ title, location, category, duration, selected, priority, onToggle }: {
  title: string; location: string; category: string; duration: number; selected: boolean; priority?: string; onToggle: () => void
}) {
  return <button type="button" aria-pressed={selected} onClick={onToggle} className={cn('w-full rounded-[14px] border border-line bg-white p-3 text-left', selected && 'border-brand/40')}>
    <span className="flex justify-between gap-2"><Badge tone="success">{category} · 약 {duration}분</Badge>{priority && <Badge tone="success">{priority}</Badge>}</span>
    <span className="mt-2 flex items-center justify-between gap-2"><span className="font-bold">{title}</span><span aria-hidden="true" className="text-xl text-brand">{selected ? '✓' : '＋'}</span></span>
    <span className="mt-1 block text-label text-muted">{location}</span>
  </button>
}

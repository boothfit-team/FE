import type { ReactNode } from 'react'
import { useId } from 'react'

export function PageHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return <div className="space-y-2">
    {eyebrow && <p className="text-[10px] font-bold text-brand">{eyebrow}</p>}
    <h1 className="text-page font-bold">{title}</h1>
    {description && <p className="text-label text-muted">{description}</p>}
  </div>
}
export function SectionHeading({ title, trailing }: { title: string; trailing?: ReactNode }) {
  return <div className="flex items-center justify-between gap-3"><h2 className="text-section font-bold">{title}</h2>{trailing && <span className="text-caption text-muted">{trailing}</span>}</div>
}
export function EventSelector({ value, onChange, events, disabled }: {
  value: string; onChange: (value: string) => void; events: readonly { id: string; name: string }[]; disabled?: boolean
}) {
  const id = useId()
  return <div className="flex items-center gap-3 rounded-xl border border-line bg-surface-muted px-[11px] py-1.5">
    <label htmlFor={id} className="w-[35px] shrink-0 text-caption font-bold text-muted">행사</label>
    <select id={id} value={value} disabled={disabled} onChange={event => onChange(event.target.value)} className="field-control min-h-[38px] rounded-badge py-1 font-bold">
      {events.map(event => <option key={event.id} value={event.id}>{event.name}</option>)}
    </select>
  </div>
}

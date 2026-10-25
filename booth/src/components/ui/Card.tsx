import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Badge, type Tone } from './Badge'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('rounded-card border border-line bg-white p-[15px]', className)} />
}
export function Divider({ className, ...props }: HTMLAttributes<HTMLHRElement>) {
  return <hr {...props} className={cn('border-0 border-t border-line', className)} />
}
export function Notice({ tone = 'brand', className, ...props }: HTMLAttributes<HTMLDivElement> & { tone?: Tone }) {
  const tones: Record<Tone, string> = {
    brand: 'border-line bg-brand-soft text-brand-strong',
    neutral: 'border-line bg-surface-muted text-muted',
    success: 'border-success/20 bg-success-soft text-success',
    warning: 'border-warning/25 bg-warning-soft text-warning',
    danger: 'border-danger/20 bg-danger-soft text-danger',
  }
  return <div {...props} className={cn('rounded-xl border p-3 text-label leading-relaxed', tones[tone], className)} />
}
export function StatCard({ label, value, suffix }: { label: string; value: ReactNode; suffix?: string }) {
  return <Card className="min-h-[98px] p-3"><Badge>{label}</Badge><p className="mt-2 text-[26px] font-bold">{value}<span className="ml-1 text-label text-muted">{suffix}</span></p></Card>
}

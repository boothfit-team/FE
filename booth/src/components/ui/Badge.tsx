import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger'
const tones: Record<Tone, string> = {
  neutral: 'bg-surface-muted text-brand',
  brand: 'bg-brand-selected text-brand-strong',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
}
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> { tone?: Tone }
export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return <span {...props} className={cn('inline-flex min-h-[25px] items-center justify-center rounded-badge px-3 py-0.5 text-caption font-bold', tones[tone], className)} />
}
export function StatusIndicator({ children, tone = 'success', className, ...props }: BadgeProps) {
  const colors: Record<Tone, string> = { neutral: 'text-muted', brand: 'text-brand', success: 'text-success', warning: 'text-warning', danger: 'text-danger' }
  return <span {...props} className={cn('inline-flex items-center gap-1.5 text-caption font-bold', colors[tone], className)}>
    <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current" />{children}
  </span>
}

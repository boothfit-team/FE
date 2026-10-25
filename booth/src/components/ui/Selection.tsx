import { useId } from 'react'
import type { ReactNode } from 'react'
import { Button } from './Button'
import { cn } from '../../lib/cn'

export interface Choice<T extends string> { value: T; label: ReactNode; disabled?: boolean }
export function ChipGroup<T extends string>({ label, options, value, onChange, className }: {
  label: string; options: readonly Choice<T>[]; value: T; onChange: (value: T) => void; className?: string
}) {
  const name = useId()
  return <fieldset className={cn('flex flex-wrap gap-[7px]', className)}>
    <legend className="sr-only">{label}</legend>
    {options.map(option => <label key={option.value} className="min-w-0 flex-1">
      <input className="peer sr-only" type="radio" name={name} value={option.value} checked={value === option.value} disabled={option.disabled} onChange={() => onChange(option.value)} />
      <span className="flex min-h-[25px] items-center justify-center whitespace-nowrap rounded-badge bg-surface-muted px-3 py-1 text-caption font-bold text-brand peer-checked:bg-brand-selected peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand peer-disabled:opacity-45">{option.label}</span>
    </label>)}
  </fieldset>
}
export function Stepper({ label, value, onChange, min = 1, max = 10, disabled = false, unit = '명' }: {
  label: string; value: number; onChange: (value: number) => void; min?: number; max?: number; disabled?: boolean; unit?: string
}) {
  const id = useId()
  return <div className="space-y-3">
    <p id={id} className="text-caption font-bold">{label}</p>
    <div role="group" aria-labelledby={id} className="flex w-fit items-center gap-5">
      <Button variant="secondary" disabled={disabled || value <= min} aria-label={label + ' 줄이기'} onClick={() => onChange(Math.max(min, value - 1))} className="w-12">−</Button>
      <output aria-live="polite" className="min-w-16 text-center font-bold">{value}{unit}</output>
      <Button variant="secondary" disabled={disabled || value >= max} aria-label={label + ' 늘리기'} onClick={() => onChange(Math.min(max, value + 1))} className="w-12">＋</Button>
    </div>
  </div>
}

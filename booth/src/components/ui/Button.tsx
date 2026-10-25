import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

const variants = {
  primary: 'bg-brand text-white hover:bg-brand-strong',
  secondary: 'bg-brand-soft text-brand hover:bg-brand-selected',
  outline: 'border border-line bg-white text-brand hover:bg-brand-soft',
  danger: 'bg-danger-soft text-danger hover:bg-danger/15',
  ghost: 'bg-transparent text-brand hover:bg-brand-soft',
}
const sizes = {
  sm: 'min-h-8 px-3 py-1 text-body',
  md: 'min-h-[43px] px-4 py-2 text-body',
  lg: 'min-h-[49px] px-4 py-3 text-body',
}
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  fullWidth?: boolean
  loading?: boolean
}
export function Button({ variant = 'primary', size = 'md', fullWidth, loading, disabled, className, children, type = 'button', ...props }: ButtonProps) {
  return <button {...props} type={type} disabled={disabled || loading} aria-busy={loading || undefined}
    className={cn('inline-flex items-center justify-center gap-2 rounded-control font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none', variants[variant], sizes[size], fullWidth && 'w-full', className)}>
    {loading && <span aria-hidden="true" className="size-3.5 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none" />}
    {children}
  </button>
}

import { useId } from 'react'
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface FieldProps {
  label: string
  hint?: string
  error?: string
  containerClassName?: string
}
function Field({ id, label, hint, error, containerClassName, children }: FieldProps & { id: string; children: ReactNode }) {
  return <div className={cn('min-w-0 space-y-1.5', containerClassName)}>
    <label htmlFor={id} className="block text-caption font-bold text-muted">{label}</label>
    {children}
    {(error || hint) && <p id={id + '-help'} className={cn('text-label', error ? 'text-danger' : 'text-muted')} role={error ? 'alert' : undefined}>{error || hint}</p>}
  </div>
}
export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, FieldProps {}
export function Input({ id, label, hint, error, containerClassName, className, ...props }: InputProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  return <Field {...{ id: fieldId, label, hint, error, containerClassName }}>
    <input {...props} id={fieldId} aria-invalid={!!error || props['aria-invalid']} aria-describedby={cn(props['aria-describedby'], (error || hint) && fieldId + '-help') || undefined} className={cn('field-control', className)} />
  </Field>
}
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldProps {}
export function Textarea({ id, label, hint, error, containerClassName, className, ...props }: TextareaProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  return <Field {...{ id: fieldId, label, hint, error, containerClassName }}>
    <textarea rows={3} {...props} id={fieldId} aria-invalid={!!error || props['aria-invalid']} aria-describedby={cn(props['aria-describedby'], (error || hint) && fieldId + '-help') || undefined} className={cn('field-control resize-y', className)} />
  </Field>
}
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, FieldProps {}
export function Select({ id, label, hint, error, containerClassName, className, children, ...props }: SelectProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  return <Field {...{ id: fieldId, label, hint, error, containerClassName }}>
    <select {...props} id={fieldId} aria-invalid={!!error || props['aria-invalid']} aria-describedby={cn(props['aria-describedby'], (error || hint) && fieldId + '-help') || undefined} className={cn('field-control', className)}>{children}</select>
  </Field>
}

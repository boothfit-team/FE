import { useEffect, useId, useRef } from 'react'
import type { ReactNode, MouseEvent, KeyboardEvent } from 'react'
import { Button } from './Button'

export interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
}
export function BottomSheet({ open, onClose, title, description, children, footer }: BottomSheetProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()
  useEffect(() => {
    const dialog = ref.current
    if (!open || !dialog) return
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialog.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [open])

  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return
    const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]')]
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }
  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return
    const rect = event.currentTarget.getBoundingClientRect()
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose()
  }
  return <dialog ref={ref} aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined}
    onCancel={event => { event.preventDefault(); onClose() }} onClick={closeOnBackdrop} onKeyDown={trapFocus}
    className="fixed inset-x-0 top-auto bottom-0 m-0 mx-auto max-h-[90dvh] w-full max-w-[430px] rounded-t-sheet border-0 bg-white p-5 pt-8 text-ink backdrop:bg-scrim/43">
    <Button variant="ghost" size="sm" autoFocus aria-label="닫기" onClick={onClose} className="absolute top-2 right-2 size-10 p-0 text-2xl text-ink">×</Button>
    <h2 id={titleId} className="pr-6 text-[22px] font-bold">{title}</h2>
    {description && <p id={descriptionId} className="mt-3 text-body text-muted">{description}</p>}
    <div className="mt-7 space-y-5">{children}</div>
    {footer && <div className="mt-7 flex gap-2 [&>*]:flex-1">{footer}</div>}
  </dialog>
}

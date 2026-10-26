import type { ReactNode } from 'react'
import { Button } from '../ui/Button'
import { cn } from '../../lib/cn'

import { navigationItems } from './navigation'
import type { UserRole } from './navigation'

export function AppHeader({ profileName = '민', onProfileClick, largeText = false, onLargeTextChange, onHomeClick, className }: {
  profileName?: string; onProfileClick?: () => void; largeText?: boolean; onLargeTextChange?: (enabled: boolean) => void; onHomeClick?: () => void; className?: string
}) {
  return <header className={cn("flex min-h-[66px] items-center gap-2 border-b border-line bg-white px-[18px] py-3", className)}>
    <button type="button" onClick={onHomeClick} aria-label="부스핏 홈" className="mr-auto whitespace-nowrap text-[25px] font-bold tracking-tight">부스<span className="text-brand">핏</span></button>
    {onLargeTextChange && <Button variant="outline" size="sm" aria-pressed={largeText} onClick={() => onLargeTextChange(!largeText)} className="min-h-[37px] px-5">큰 글씨 모드</Button>}
    {onProfileClick && <button type="button" aria-label={profileName + ' 프로필'} onClick={onProfileClick} className="flex size-9 shrink-0 items-center justify-center rounded-full border border-brand/15 bg-brand-soft text-sm font-bold text-brand-strong">{profileName.slice(0, 1)}</button>}
  </header>
}
export function BottomNavigation({ role, activeId, onNavigate, className }: {
  role: UserRole; activeId: string; onNavigate: (id: string) => void; className?: string
}) {
  return <nav aria-label="주 메뉴" className={cn('flex gap-1 border-t border-line bg-white px-[9px] pt-2 pb-[max(8px,env(safe-area-inset-bottom))]', className)}>
    {navigationItems[role].map(item => <button key={item.id} type="button" aria-current={activeId === item.id ? 'page' : undefined} onClick={() => onNavigate(item.id)}
      className={cn('flex min-h-[60px] min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1 font-bold', activeId === item.id ? 'bg-brand-soft text-brand' : 'text-subtle hover:bg-surface-muted')}>
      <span aria-hidden="true" className="text-[21px] leading-7">{item.icon}</span><span className="text-label">{item.label}</span>
    </button>)}
  </nav>
}
export function AppShell({ header, navigation, children, largeText, className, mainClassName }: {
  header: ReactNode; navigation?: ReactNode; children: ReactNode; largeText?: boolean; className?: string; mainClassName?: string
}) {
  return <div className={cn('relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-canvas', largeText && 'large-text', className)}>
    {header}<main className={cn("flex-1 space-y-5 px-[18px] pt-3 pb-6", mainClassName)}>{children}</main>
    {navigation && <div className="sticky bottom-0 z-10 mt-auto">{navigation}</div>}
  </div>
}
export function DetailHeader({ title, onBack, onClose }: { title: string; onBack?: () => void; onClose?: () => void }) {
  return <header className="flex min-h-16 items-center gap-3 border-b border-line bg-white px-[18px]">
    {onBack && <Button variant="secondary" aria-label="뒤로 가기" onClick={onBack}>‹</Button>}
    <h1 className="flex-1 text-section font-bold">{title}</h1>
    {onClose && <Button variant="ghost" aria-label="닫기" onClick={onClose} className="text-2xl text-ink">×</Button>}
  </header>
}

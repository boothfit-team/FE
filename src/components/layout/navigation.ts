export type UserRole = 'visitor' | 'operator' | 'admin'
export const navigationItems = {
  visitor: [{ id: 'explore', label: '부스 탐색', icon: '⌕' }, { id: 'reservations', label: '내 예약', icon: '▣' }, { id: 'vacancies', label: '빈자리', icon: '♧' }],
  operator: [{ id: 'queue', label: '현장 운영', icon: '☰' }, { id: 'manage', label: '부스 관리', icon: '▣' }, { id: 'register', label: '부스 등록', icon: '＋' }],
  admin: [{ id: 'events', label: '행사 설정', icon: '◷' }, { id: 'approvals', label: '부스 승인', icon: '✓' }, { id: 'overview', label: '전체 현황', icon: '▦' }],
} as const


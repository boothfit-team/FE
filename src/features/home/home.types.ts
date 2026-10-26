export type BoothCategory = '체험' | '게임' | '만들기' | '전시'
export type CategoryFilter = '전체' | BoothCategory
export interface Festival {
  name: string
  departureTime: string
  dates: readonly { value: string; label: string; shortLabel: string }[]
}
export interface HomeBooth {
  id: string
  title: string
  posterLines: readonly string[]
  category: BoothCategory
  location: string
  description: string
  dates: readonly string[]
  operatingHours: string
  duration: number
  waitMinutes: number
  reservationCount: number
  rating: number
  reviewCount: number
  posterColor: string
  accentColor: string
}

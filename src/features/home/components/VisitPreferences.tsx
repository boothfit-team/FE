import { Card, Input, Select } from '../../../components'
import type { Festival } from '../home.types'

interface VisitPreferencesProps {
  festival: Festival
  date: string
  departureTime: string
  onDateChange: (date: string) => void
  onDepartureTimeChange: (time: string) => void
}
export function VisitPreferences({ festival, date, departureTime, onDateChange, onDepartureTimeChange }: VisitPreferencesProps) {
  return <section aria-label="방문 일정" className="space-y-4">
    <Card className="min-h-[94px] p-3 pt-2">
      <Input label="행사장을 떠날 시각" type="time" value={departureTime} onChange={event => onDepartureTimeChange(event.target.value)}
        containerClassName="space-y-0" className="min-h-[38px] py-1.5" />
    </Card>
    <Select label="방문 날짜" value={date} onChange={event => onDateChange(event.target.value)}
      containerClassName="grid grid-cols-[65px_minmax(0,1fr)] items-center gap-[9px] space-y-0"
      className="min-h-[37px] rounded-badge py-1.5 text-label font-bold">
      {festival.dates.map(day => <option key={day.value} value={day.value}>{day.label}</option>)}
    </Select>
  </section>
}

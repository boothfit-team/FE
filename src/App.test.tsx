import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import App from './App'
import ComponentGallery from './demo/ComponentGallery'

afterEach(cleanup)

test('opens the visitor home by default with the draft festival', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /기다림은 줄이고/ })).toBeTruthy()
  expect(screen.getByRole('combobox', { name: '방문 날짜' })).toBeTruthy()
  expect(screen.getByText('12개 운영 가능')).toBeTruthy()
  expect(screen.getByLabelText<HTMLInputElement>('행사장을 떠날 시각').value).toBe('18:00')
})

test('home filters by category and visit date and clears previous-day selections', () => {
  render(<App />)
  fireEvent.click(screen.getByRole('radio', { name: '게임' }))
  expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3)
  expect(screen.queryByRole('heading', { name: '미래를 그리는 AI' })).toBeNull()
  fireEvent.click(screen.getAllByRole('button', { name: '선택하기' })[0])
  expect(screen.getByRole('status').textContent).toContain('선택한 부스 1개')
  fireEvent.change(screen.getByRole('combobox', { name: '방문 날짜' }), { target: { value: '2026-10-17' } })
  expect(screen.getByText('8개 운영 가능')).toBeTruthy()
  expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2)
  expect(screen.queryByRole('status')).toBeNull()
  fireEvent.change(screen.getByLabelText('행사장을 떠날 시각'), { target: { value: '16:30' } })
  expect(screen.getByLabelText<HTMLInputElement>('행사장을 떠날 시각').value).toBe('16:30')
})

test('reservation headcount in the component gallery respects its bounds', () => {
  render(<ComponentGallery />)
  const decrease = screen.getByRole<HTMLButtonElement>('button', { name: '예약 인원 줄이기' })
  const increase = screen.getByRole<HTMLButtonElement>('button', { name: '예약 인원 늘리기' })
  expect(decrease.disabled).toBe(true)
  fireEvent.click(increase)
  expect(screen.getByRole('status').textContent).toBe('2명')
  expect(increase.disabled).toBe(true)
  fireEvent.click(decrease)
  expect(decrease.disabled).toBe(true)
})

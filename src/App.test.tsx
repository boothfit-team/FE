import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import App from './App'

afterEach(cleanup)

test('renders the component gallery and role preview links', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: '공통 컴포넌트' })).toBeTruthy()
  expect(screen.getByRole('link', { name: '방문자 화면 ↗' }).getAttribute('href')).toBe('?preview=visitor')
})

test('reservation headcount respects the minimum and maximum', () => {
  render(<App />)
  const decrease = screen.getByRole<HTMLButtonElement>('button', { name: '예약 인원 줄이기' })
  const increase = screen.getByRole<HTMLButtonElement>('button', { name: '예약 인원 늘리기' })
  expect(decrease.disabled).toBe(true)
  fireEvent.click(increase)
  expect(screen.getByRole('status').textContent).toBe('2명')
  expect(increase.disabled).toBe(true)
  fireEvent.click(decrease)
  expect(screen.getByRole('status').textContent).toBe('1명')
  expect(decrease.disabled).toBe(true)
})

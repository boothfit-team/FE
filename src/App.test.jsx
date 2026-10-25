import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import App from './App.jsx'

afterEach(cleanup)

test('renders the app and responds to a user action', () => {
  render(<App />)

  expect(screen.getByRole('heading', { name: '부스핏' })).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: '화면 동작 확인' }))
  expect(screen.getByRole('status').textContent).toBe('화면이 정상 동작합니다.')
})

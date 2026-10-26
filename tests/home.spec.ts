import { test, expect } from '@playwright/test'

test('home filters dates and categories, edits departure and selects booths', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('기다림은 줄이고,재미는 더 많이.')
  await expect(page.getByText('12개 운영 가능')).toBeVisible()
  await page.getByLabel('행사장을 떠날 시각').fill('16:30')
  await page.getByRole('radio', { name: '게임', exact: true }).focus()
  await page.keyboard.press('Space')
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(3)
  await page.getByRole('combobox', { name: '방문 날짜' }).selectOption('2026-10-17')
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(2)
  await expect(page.getByText('8개 운영 가능')).toBeVisible()
  await page.getByRole('button', { name: '선택하기', exact: true }).first().click()
  await expect(page.getByRole('status')).toContainText('선택한 부스 1개')
  await expect(page.getByRole('status')).toContainText('16:30')
  await page.getByRole('button', { name: '선택 해제', exact: true }).click()
  await expect(page.getByRole('status')).toHaveCount(0)
})

test('future-page entry points show an honest notice and return to home', async ({ page }) => {
  await page.goto('/')
  for (const name of ['초대 입력', '내 예약', '빈자리', '민 프로필']) {
    const trigger = page.getByRole('button', { name, exact: true })
    await trigger.click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByRole('dialog')).toContainText('이 화면은 준비 중이에요.')
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).not.toBeVisible()
    await expect(trigger).toBeFocused()
  }
})

test('home stays within mobile widths and keeps navigation visible while scrolling', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  for (const width of [320, 430, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await expect(page.getByRole('navigation', { name: '주 메뉴' })).toBeInViewport()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    await page.getByRole('button', { name: '큰 글씨 모드' }).click()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(page.getByRole('navigation', { name: '주 메뉴' })).toBeInViewport()
  }
  expect(errors).toEqual([])
})

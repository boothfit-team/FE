import { test, expect } from '@playwright/test'

test('category filtering and booth selection are controlled', async ({ page }) => {
  await page.goto('/?preview=visitor')
  await expect(page.getByRole('button', { name: '선택하기', exact: true })).toHaveCSS('color', 'rgb(255, 255, 255)')
  await page.getByRole('button', { name: '선택하기', exact: true }).click()
  await expect(page.getByRole('button', { name: '선택 해제' })).toHaveAttribute('aria-pressed', 'true')
  await page.getByText('게임', { exact: true }).click()
  await expect(page.getByText('이 미리보기에는 체험 부스 한 개가 준비되어 있어요.')).toBeVisible()
  await page.getByText('체험', { exact: true }).click()
  await expect(page.getByRole('button', { name: '선택 해제' })).toBeVisible()
})

test('stepper respects min/max and radio group supports keyboard selection', async ({ page }) => {
  await page.goto('/?preview=components')
  const minus = page.getByRole('button', { name: '예약 인원 줄이기' })
  const plus = page.getByRole('button', { name: '예약 인원 늘리기' })
  await expect(minus).toBeDisabled()
  await plus.click()
  await expect(plus).toBeDisabled()
  await expect(page.getByRole('status').filter({ hasText: '2명' })).toBeVisible()
  await minus.click()
  await expect(minus).toBeDisabled()
  await page.getByRole('radio', { name: '전체', exact: true }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('radio', { name: '체험', exact: true })).toBeChecked()
})

test('bottom sheet traps focus, closes on Escape and restores trigger focus', async ({ page }) => {
  await page.goto('/?preview=components')
  const trigger = page.getByRole('button', { name: '확인 바텀시트 열기' })
  await trigger.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('button', { name: '닫기', exact: true })).toBeFocused()
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press('Tab')
    expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true)
  }
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await trigger.click()
  await page.mouse.click(5, 5)
  await expect(dialog).not.toBeVisible()
})

test('reservation cancellation is confirmed before changing local state', async ({ page }) => {
  await page.goto('/?preview=visitor')
  await page.getByRole('button', { name: '내 예약', exact: true }).click()
  await page.getByRole('button', { name: '예약 취소', exact: true }).click()
  await page.getByRole('dialog').getByRole('button', { name: '돌아가기' }).click()
  await expect(page.getByRole('button', { name: '예약 취소', exact: true })).toBeVisible()
  await page.getByRole('button', { name: '예약 취소', exact: true }).click()
  await page.getByRole('dialog').getByRole('button', { name: '확인', exact: true }).click()
  await expect(page.getByText('예약이 없습니다.')).toBeVisible()
})

test('queue arrival and next-team confirmation update the preview', async ({ page }) => {
  await page.goto('/?preview=operator')
  await page.getByRole('button', { name: '도착 표시' }).click()
  await expect(page.getByRole('button', { name: '도착 완료' })).toBeDisabled()
  await page.getByRole('button', { name: '다음 팀 받기' }).click()
  await page.getByRole('dialog').getByRole('button', { name: '확인', exact: true }).click()
  await expect(page.getByRole('heading', { name: '선배B · 미래를 그리는 AI' })).toBeVisible()
  await expect(page.getByRole('button', { name: '다음 팀 받기' })).toBeDisabled()
})

test('admin date rows and time validation work without saving to a server', async ({ page }) => {
  await page.goto('/?preview=admin')
  await page.getByRole('button', { name: '＋ 날짜 추가' }).click()
  await page.getByLabel('운영 날짜 3').fill('2027-04-17')
  await page.getByLabel('전체 종료').fill('09:00')
  await page.getByRole('button', { name: '행사 생성·선택' }).click()
  await expect(page.getByRole('status')).toContainText('종료 시각은 시작 시각보다')
  await page.getByLabel('전체 종료').fill('17:00')
  await page.getByRole('button', { name: '행사 생성·선택' }).click()
  await expect(page.getByRole('status')).toContainText('2027 봄 학술제 행사 입력을 확인했어요.')
})

test('previews fit narrow screens, enlarged text and desktop without overflow or console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  for (const width of [320, 430, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    for (const preview of ['', 'visitor', 'operator', 'admin']) {
      await page.goto(preview ? '/?preview=' + preview : '/')
      await page.evaluate(() => document.fonts.ready)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      if (preview) {
        await page.getByRole('button', { name: '큰 글씨 모드' }).click()
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
      }
    }
  }
  expect(errors).toEqual([])
})

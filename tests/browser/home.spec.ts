import { expect, test } from '@playwright/test';

test('visitor can open the production-built home page', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: /Matteo Stara/ }),
  ).toBeVisible();
});

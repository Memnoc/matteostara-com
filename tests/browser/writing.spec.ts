import { expect, test } from '@playwright/test';

test('visitor cannot discover or open unfinished writing', async ({ page, request }) => {
  await page.goto('/');

  await expect(page.getByRole('navigation').getByRole('link', { name: 'writing' }))
    .toHaveCount(0);

  const writingResponse = await page.goto('/writing/');
  expect(writingResponse?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 2, name: 'Writing' })).toBeVisible();
  await expect(page.getByText('No reviewed writing is published yet.')).toBeVisible();
  await expect(page.getByText('Test post with thumbnail')).toHaveCount(0);
  await expect(page.getByText('Variable resolution across scope boundaries')).toHaveCount(0);

  for (const path of [
    '/writing/test-thumbnail/',
    '/writing/variable-resolution/',
    '/writing/tag/test/',
    '/writing/tag/compilers/',
    '/writing/tag/crafting_interpreters/',
    '/writing/tag/c_language/',
  ]) {
    const response = await request.get(path);
    expect(response.status(), `${path} must not be public`).toBe(404);
  }
});

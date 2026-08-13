import { expect, test } from '@playwright/test';
import { readdirSync } from 'node:fs';

function robotsPatternMatchesPath(pattern: string, path: string) {
  const anchorsAtEnd = pattern.endsWith('$');
  const patternBody = anchorsAtEnd ? pattern.slice(0, -1) : pattern;
  const expression = patternBody
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replaceAll('*', '.*');

  return new RegExp(`^${expression}${anchorsAtEnd ? '$' : ''}`).test(path);
}

test('visitor can open the production-built home page', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: /Matteo Stara/ }),
  ).toBeVisible();
});

test('crawler can observe the Public draft noindex directive', async ({ page, request }) => {
  const generatedPages = readdirSync('dist', { recursive: true })
    .filter((path): path is string => typeof path === 'string' && path.endsWith('index.html'))
    .map((path) => `/${path.replace(/index\.html$/, '')}`)
    .sort();

  for (const path of generatedPages) {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, follow',
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      new URL(path, 'https://memnoc.dev').href,
    );
  }

  const robotsResponse = await request.get('/robots.txt');
  if (robotsResponse.ok()) {
    const disallowPatterns = (await robotsResponse.text())
      .split('\n')
      .flatMap((line) => {
        const directive = line
          .replace(/#.*/, '')
          .match(/^\s*Disallow\s*:\s*(.*?)\s*$/i);
        return directive?.[1] ? [directive[1]] : [];
      });

    for (const path of generatedPages) {
      expect(
        disallowPatterns.filter((pattern) => robotsPatternMatchesPath(pattern, path)),
        `robots.txt must not disallow generated page ${path}`,
      ).toEqual([]);
    }
  }
});

test('shared metadata identifies the actual page at its canonical URL', async ({ page }) => {
  await page.goto('/about/');

  const title = 'About — Matteo Stara (memnoc)';
  const description =
    'Matteo Stara (memnoc) — Sr. Software Engineer using AI to help build connectors between software systems.';
  const canonicalUrl = 'https://memnoc.dev/about/';

  await expect(page).toHaveTitle(title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    description,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    canonicalUrl,
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    'content',
    'website',
  );
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
    'content',
    'Matteo Stara (memnoc)',
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    title,
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    'content',
    description,
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    canonicalUrl,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    'content',
    'summary',
  );
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
    'content',
    title,
  );
  await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute(
    'content',
    description,
  );
});

test('initial theme follows the operating-system preference and exposes its state', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.addInitScript(() => {
    requestAnimationFrame(() => {
      (window as Window & { firstFrameTheme?: string | null }).firstFrameTheme =
        document.documentElement.getAttribute('data-theme');
    });
  });
  await page.goto('/');

  await expect.poll(() => page.evaluate(() => (
    window as Window & { firstFrameTheme?: string | null }
  ).firstFrameTheme)).toBe('moon');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'moon');
  await expect(page.getByRole('button', { name: 'Theme: Moon' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('manual theme choice persists across navigation and reloads', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');

  const dawnTheme = page.getByRole('button', { name: 'Theme: Dawn' });
  await expect(dawnTheme).toHaveAttribute('aria-pressed', 'false');
  await dawnTheme.click();

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'moon');
  await expect(page.getByRole('button', { name: 'Theme: Moon' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );

  await page.getByRole('link', { name: 'about' }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'moon');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'moon');
  await expect(page.getByRole('button', { name: 'Theme: Moon' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

import { expect, test } from '@playwright/test';

test('visitor sees an honest standalone parser without shell framing', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByText(
      'Standalone browser-side Lox expression parser inspired by the StarScript learning path.',
    ),
  ).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Lox expression' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'shell' })).toHaveCount(0);
  await expect(page.getByLabel('shell input')).toHaveCount(0);

  await page.goto('/about/');
  await expect(
    page.getByText(
      'The home-page demo is a standalone browser-side parser inspired by this learning path; it does not run or share parser code with StarScript.',
    ),
  ).toBeVisible();
  await expect(page.getByText(/wired directly to StarScript/)).toHaveCount(0);
  await expect(page.getByText(/named grammar rules|custom error recovery/)).toHaveCount(0);
});

test('visitor sees multiplication grouped before addition', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('img', {
      name: 'Parse tree for “1 + 2 * 3”: (+ 1 (* 2 3))',
    }),
  ).toBeVisible();
});

test('visitor sees the supported expression grammar with left associativity', async ({ page }) => {
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'Lox expression' });

  const cases = [
    ['"hello"', '"hello"'],
    ['identifier', 'identifier'],
    ['!(a + 2)', '(! (group (+ a 2)))'],
    ['12 / 3 * 2', '(* (/ 12 3) 2)'],
    ['10 - 3 + 1', '(+ (- 10 3) 1)'],
    ['a < b <= c', '(<= (< a b) c)'],
    ['a == b != false', '(!= (== a b) false)'],
  ] as const;

  for (const [expression, tree] of cases) {
    await input.fill(expression);
    await expect(
      page.getByRole('img', {
        name: `Parse tree for “${expression}”: ${tree}`,
      }),
    ).toBeVisible();
  }
});

test('visitor receives announced errors for every invalid-input class', async ({ page }) => {
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'Lox expression' });

  const cases = [
    ['1 @ 2', 'Unsupported character “@”.'],
    ['12.3.4', 'Malformed number “12.3.4”.'],
    ['"unfinished', 'Unterminated string.'],
    ['1 2', 'Unexpected token “2”.'],
    ['1 +', 'Expected an expression.'],
    ['(1 + 2', 'Expected “)” after expression.'],
  ] as const;

  for (const [expression, error] of cases) {
    await input.fill(expression);
    await expect(page.getByRole('alert')).toHaveText(error);
    await expect(page.getByRole('img', { name: /Parse tree/ })).toHaveCount(0);
  }
});

test('visitor is not offered or allowed string escape syntax', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('button', { name: /\\/ })).toHaveCount(0);
  await page.getByRole('textbox', { name: 'Lox expression' }).fill('"hello\\nworld"');

  await expect(page.getByRole('alert')).toHaveText('String escapes are not supported.');
});

test('keyboard user can choose an example and receive its parse tree', async ({ page }) => {
  await page.goto('/');

  const example = page.getByRole('button', { name: '(a + b) * c', exact: true });
  await example.focus();
  await page.keyboard.press('Enter');

  await expect(page.getByRole('textbox', { name: 'Lox expression' })).toHaveValue('(a + b) * c');
  await expect(
    page.getByRole('img', {
      name: 'Parse tree for “(a + b) * c”: (* (group (+ a b)) c)',
    }),
  ).toBeVisible();
});

test('wide parse tree stays contained within the demo on a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/');

  await page.getByRole('textbox', { name: 'Lox expression' }).fill(
    'one + two + three + four + five + six + seven + eight',
  );

  await expect(page.getByRole('img', { name: /Parse tree/ })).toBeVisible();
  const demo = page.getByRole('region', { name: 'Lox expression parser' });
  const tree = page.getByRole('group', { name: 'Scrollable parse tree' });
  const overflow = {
    page: await page.evaluate(() => (
      document.documentElement.scrollWidth > document.documentElement.clientWidth
    )),
    demo: await demo.evaluate((element) => element.scrollWidth > element.clientWidth),
    tree: await tree.evaluate((element) => element.scrollWidth > element.clientWidth),
  };

  expect(overflow).toEqual({ page: false, demo: false, tree: true });
});

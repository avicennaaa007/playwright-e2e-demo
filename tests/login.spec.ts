import { test } from '@playwright/test';
import { users } from '../test-data/users';

test('logs in to the bank app with a valid user', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');

  const identifierInput = page.getByRole('textbox').first();
  const passwordInput = page.getByRole('textbox').nth(1);

  await identifierInput.fill(users.validUser.username);
  await passwordInput.fill(users.validUser.password);
  await page.getByRole('button', { name: /zaloguj się/i }).click();
});

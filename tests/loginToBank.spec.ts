import { expect, test } from '@fixtures/bank.fixture';
import { LoginPage } from '@pages/login.page';
import { users } from '@test-data/users';

test('1. Logs in to the bank app with a valid user', async ({ loginToBankApp }) => {
  await loginToBankApp();
});

test('2. Keeps the login button disabled when only login is provided', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.fillLogin(users.validUser.username);

  await expect(loginPage.loginButton).toBeDisabled();
});

test('3. Keeps the login button disabled when only password is provided', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.fillPassword(users.validUser.password);

  await expect(loginPage.loginButton).toBeDisabled();
});

test('4. Keeps the login button disabled when login and password are empty', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await expect(loginPage.loginButton).toBeDisabled();
});

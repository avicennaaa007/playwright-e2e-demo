import { expect, test as base } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { users } from '@test-data/users';

type BankUser = {
  username: string;
  password: string;
};

export type LoginToBankApp = (user?: BankUser) => Promise<void>;

type BankFixtures = {
  loginToBankApp: LoginToBankApp;
};

export const test = base.extend<BankFixtures>({
  loginToBankApp: async ({ page }, use) => {
    const loginToBankApp: LoginToBankApp = async (user = users.validUser) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.fillLogin(user.username);
      await loginPage.fillPassword(user.password);
      await loginPage.loginButton.click();
    };

    await use(loginToBankApp);
  },
});

export { expect };

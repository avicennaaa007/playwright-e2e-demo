import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.loginInput = page.getByTestId('login-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
  }

  async goto() {
    await this.page.goto('https://demo-bank.vercel.app/');
  }

  async fillLogin(login: string) {
    await this.loginInput.fill(login);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }
}

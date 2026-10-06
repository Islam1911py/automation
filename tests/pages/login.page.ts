import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get emailInput() { return this.page.locator('input[data-qa="login-email"]'); }
  get passwordInput() { return this.page.locator('input[data-qa="login-password"]'); }
  get loginButton() { return this.page.getByRole('button', { name: 'Login' }); }
  get loginPageHeading() { return this.page.getByRole('heading', { name: 'Login to your account' }); }
  get invalidCredentialsMessage() { return this.page.getByText('Your email or password is incorrect!'); }

  // Actions
  async openLoginPage() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Assertions
  async expectInvalidCredentials() {
    await expect(this.invalidCredentialsMessage).toBeVisible();
  }

  async expectLoginPageVisible() {
    await expect(this.page).toHaveURL(/\/login$/);
    await expect(this.loginPageHeading).toBeVisible();
  }
}

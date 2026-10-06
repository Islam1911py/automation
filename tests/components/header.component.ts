import { expect, Page } from '@playwright/test';

/** Shared site navigation that appears in the page header. */
export class HeaderComponent {
  constructor(private readonly page: Page) {}

  // Locators
  get homeLink() { return this.page.locator('header .navbar-nav a[href="/"]'); }
  get productsLink() { return this.page.locator('header .navbar-nav a[href="/products"]'); }
  get cartLink() { return this.page.locator('header .navbar-nav a[href="/view_cart"]'); }
  get signupLoginLink() { return this.page.locator('header .navbar-nav a[href="/login"]'); }
  get testCasesLink() { return this.page.locator('header .navbar-nav a[href="/test_cases"]'); }
  get contactUsLink() { return this.page.locator('header .navbar-nav a[href="/contact_us"]'); }
  get loggedInAsUserText() { return this.page.locator('header').getByText(/Logged in as/i); }
  get deleteAccountLink() { return this.page.locator('header .navbar-nav a[href="/delete_account"]'); }
  get logoutLink() { return this.page.locator('header .navbar-nav a[href="/logout"]'); }

  // Actions
  async clickHome() { await this.homeLink.click(); }
  async clickProducts() { await this.productsLink.click(); }
  async clickCart() { await this.cartLink.click(); }
  async clickSignupLogin() { await this.signupLoginLink.click(); }
  async clickTestCases() { await this.testCasesLink.click(); }
  async clickContactUs() { await this.contactUsLink.click(); }
  async clickDeleteAccount() { await this.deleteAccountLink.click(); }
  async clickLogout() { await this.logoutLink.click(); }

  // Assertions
  async expectLoggedInAsVisible(username: string) {
    await expect(this.loggedInAsUserText).toContainText(username);
  }

  async expectLoggedOut() {
    await expect(this.signupLoginLink).toBeVisible();
  }
}
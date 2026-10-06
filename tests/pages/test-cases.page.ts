import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class TestCasesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get pageTitle() { return this.page.locator('b'); }
  get instructions() { return this.page.locator('h5'); }
  get firstTestCaseLink() { return this.page.getByRole('link', { name: /^Test Case 1:/ }); }
  get lastTestCaseLink() { return this.page.getByRole('link', { name: /^Test Case 26:/ }); }

  // Actions
  async openTestCasesPage() {
    await this.goto('/test_cases');
  }

  async clickTestCase(testCaseName: string) {
    await this.page.getByRole('link', { name: testCaseName, exact: true }).click();
  }

  // Assertions
  async expectTestCasesPageVisible() {
    await expect(this.page).toHaveURL(/\/test_cases$/);
    await expect(this.pageTitle).toContainText('Test Cases');
  }

  async expectInstructionsVisible() {
    await expect(this.instructions).toContainText(
      'Below is the list of test Cases for you to practice the Automation.',
    );
  }

  async expectAllTestCasesVisible() {
    await expect(this.firstTestCaseLink).toBeVisible();
    await expect(this.lastTestCaseLink).toBeVisible();
  }
}

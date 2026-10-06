import { expect, Page } from '@playwright/test';

/** Shared newsletter and subscription controls at the bottom of pages. */
export class FooterComponent {
  constructor(private readonly page: Page) {}

  // Locators
  get subscriptionHeading() {
    return this.page.getByRole('heading', { name: 'Subscription', exact: true });
  }
  get subscriptionEmailInput() {
    return this.page.getByRole('textbox', { name: 'Your email address' });
  }
  get subscribeButton() { return this.page.locator('#subscribe'); }
  get subscribeSuccessMessage() {
    return this.page.getByText('You have been successfully subscribed!');
  }

  // Actions
  async scrollToFooter() {
    await this.subscriptionHeading.scrollIntoViewIfNeeded();
  }

  async subscribeToNewsletter(email: string) {
    await this.subscriptionEmailInput.fill(email);
    await this.subscribeButton.click();
  }

  // Assertions
  async expectSubscriptionHeadingVisible() {
    await expect(this.subscriptionHeading).toBeVisible();
  }

  async expectSubscriptionSuccessMessage() {
    await expect(this.subscribeSuccessMessage).toBeVisible();
  }

  // Checks the browser validity state because the validation message text differs per browser and locale.
  async expectEmailInputRejected() {
    const isValid = await this.subscriptionEmailInput.evaluate(
      (element: HTMLInputElement) => element.validity.valid,
    );
    expect(isValid).toBe(false);
    await expect(this.subscribeSuccessMessage).toBeHidden();
  }
}
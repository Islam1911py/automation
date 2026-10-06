import { expect, Page } from '@playwright/test';
import type { RegistrationUser } from '../testData';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get addressDelivery() { return this.page.locator('#address_delivery'); }
  get addressInvoice() { return this.page.locator('#address_invoice'); }
  get orderCommentInput() { return this.page.locator('#ordermsg textarea'); }
  get placeOrderLink() { return this.page.getByRole('link', { name: 'Place Order' }); }
  get orderRows() { return this.page.locator('#cart_info tbody tr'); }
  get addressDetailsHeading() { return this.page.getByText('Address Details', { exact: true }); }
  get orderReviewHeading() { return this.page.getByText('Review Your Order', { exact: true }); }

  // Actions
  async placeOrder(comment: string) {
    await this.orderCommentInput.fill(comment);
    await this.placeOrderLink.click();
  }

  // Assertions
  async expectCheckoutPageVisible() {
    await expect(this.page).toHaveURL(/\/checkout/);
    await expect(this.addressDetailsHeading).toBeVisible();
    await expect(this.orderReviewHeading).toBeVisible();
  }

  async expectAddressesMatch(user: RegistrationUser) {
    for (const address of [this.addressDelivery, this.addressInvoice]) {
      await expect(address).toContainText(`${user.firstName} ${user.lastName}`);
      await expect(address).toContainText(user.address1);
      if (user.address2) await expect(address).toContainText(user.address2);
      await expect(address).toContainText(user.city);
      await expect(address).toContainText(user.state);
      await expect(address).toContainText(user.zipCode);
      await expect(address).toContainText(user.country);
    }
  }

  async expectOrderContainsProduct(productName: string) {
    await expect(this.orderRows.filter({ hasText: productName })).toHaveCount(1);
  }
}

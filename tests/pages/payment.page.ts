import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export type CardDetails = {
  name: string;
  number: string;
  cvc: string;
  month: string;
  year: string;
};

export class PaymentPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get nameOnCardInput() { return this.page.locator('[name="name_on_card"]'); }
  get cardNumberInput() { return this.page.locator('[name="card_number"]'); }
  get cvcInput() { return this.page.locator('[name="cvc"]'); }
  get expiryMonthInput() { return this.page.locator('[name="expiry_month"]'); }
  get expiryYearInput() { return this.page.locator('[name="expiry_year"]'); }
  get confirmOrderButton() { return this.page.locator('#submit'); }
  get orderSuccessMessage() { return this.page.getByText(/Your order has been placed successfully|Congratulations! Your order has been confirmed/i); }
  get downloadInvoiceLink() { return this.page.getByRole('link', { name: /Download Invoice/i }); }
  get continueButton() { return this.page.getByRole('link', { name: 'Continue' }); }

  async enterPaymentDetails(details: CardDetails) {
    await this.nameOnCardInput.fill(details.name);
    await this.cardNumberInput.fill(details.number);
    await this.cvcInput.fill(details.cvc);
    await this.expiryMonthInput.fill(details.month);
    await this.expiryYearInput.fill(details.year);
    await this.confirmOrderButton.click();
  }

  async expectOrderPlaced() {
    await expect(this.orderSuccessMessage).toBeVisible();
  }

  async downloadInvoice() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadInvoiceLink.click();
    const download = await downloadPromise;
    await expect(download.suggestedFilename().toLowerCase()).toContain('invoice');
    return download;
  }

  async continueAfterInvoice() {
    await this.continueButton.click();
  }
}

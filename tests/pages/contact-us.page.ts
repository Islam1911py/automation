import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ContactUsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get contactUsHeading() { return this.page.getByRole('heading', { name: 'Contact Us' }); }
  get contactUsForm() { return this.page.locator('#contact-us-form'); }
  get nameInput() { return this.page.getByPlaceholder('Name'); }
  get emailInput() { return this.page.locator('input[data-qa="email"]'); }
  get subjectInput() { return this.page.locator('input[data-qa="subject"]'); }
  get messageInput() { return this.page.locator('textarea[data-qa="message"]'); }
  get submitButton() { return this.page.getByRole('button', { name: 'Submit' }); }
  get successMessage() {
    return this.page
      .locator('#contact-page .status.alert.alert-success')
      .getByText('Success! Your details have been submitted successfully.', { exact: true });
  }

  // Actions
  async openContactUsPage() {
    await this.goto('/contact_us');
  }

  async fillContactUsForm(name: string, email: string, subject: string, message: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
  }

  async submitForm() {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.submitButton.click();
  }

  // Assertions
  async expectContactUsPageVisible() {
    await expect(this.contactUsHeading).toBeVisible();
  }

  async expectContactUsFormVisible() {
    await expect(this.contactUsForm).toBeVisible();
  }

  async expectContactUsSuccessMessageVisible() {
    await expect(this.successMessage).toBeVisible();
  }
}

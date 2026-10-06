import { expect, Page } from '@playwright/test';
import type { RegistrationUser } from '../testData';
import { BasePage } from './base.page';

export class SignupPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get nameInput() { return this.page.getByPlaceholder('Name'); }
  get emailInput() { return this.page.locator('input[data-qa="signup-email"]'); }
  get signupButton() { return this.page.getByRole('button', { name: 'Signup' }); }
  get existingEmailMessage() { return this.page.getByText('Email Address already exist!'); }
  get enterAccountInfoHeading() {
    return this.page.getByRole('heading', { name: 'Enter Account Information' });
  }
  get accountCreatedMessage() { return this.page.getByText('Account Created!'); }
  get titleMrRadio() { return this.page.locator('#id_gender1'); }
  get passwordInput() { return this.page.locator('#password'); }
  get daySelect() { return this.page.locator('#days'); }
  get monthSelect() { return this.page.locator('#months'); }
  get yearSelect() { return this.page.locator('#years'); }
  get newsletterCheckbox() { return this.page.locator('#newsletter'); }
  get offersCheckbox() { return this.page.locator('#optin'); }
  get firstNameInput() { return this.page.locator('#first_name'); }
  get lastNameInput() { return this.page.locator('#last_name'); }
  get companyInput() { return this.page.locator('#company'); }
  get addressOneInput() { return this.page.locator('#address1'); }
  get addressTwoInput() { return this.page.locator('#address2'); }
  get countrySelect() { return this.page.locator('#country'); }
  get stateInput() { return this.page.locator('#state'); }
  get cityInput() { return this.page.locator('#city'); }
  get zipCodeInput() { return this.page.locator('#zipcode'); }
  get mobileNumberInput() { return this.page.locator('#mobile_number'); }
  get createAccountButton() { return this.page.getByRole('button', { name: 'Create Account' }); }
  get continueButton() { return this.page.getByRole('link', { name: 'Continue' }); }
  get signupForm() { return this.page.locator('#form'); }
  get loggedInAsText() { return this.page.getByText(/Logged in as/i); }
  get deleteAccountButton() { return this.page.getByRole('link', { name: 'Delete Account' }); }
  get accountDeletedMessage() {
    return this.page.getByRole('heading', { name: 'Account Deleted!' });
  }

  // Actions
  async openSignupPage() {
    await this.header.clickSignupLogin();
  }

  async registerNewUser(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
  }

  async fillAccountDetails(user: RegistrationUser) {
    await this.titleMrRadio.check();
    await this.passwordInput.fill(user.password);
    await this.daySelect.selectOption(user.day);
    await this.monthSelect.selectOption(user.month);
    await this.yearSelect.selectOption(user.year);

    if (user.newsletter) await this.newsletterCheckbox.check();
    if (user.offers) await this.offersCheckbox.check();

    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    if (user.company) await this.companyInput.fill(user.company);
    await this.addressOneInput.fill(user.address1);
    if (user.address2) await this.addressTwoInput.fill(user.address2);
    await this.countrySelect.selectOption(user.country);
    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipCodeInput.fill(user.zipCode);
    await this.mobileNumberInput.fill(user.mobileNumber);
  }

  async fillAndSubmitSignup(user: RegistrationUser) {
    await this.fillAccountDetails(user);
    await this.createAccountButton.click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async deleteAccount() {
    await this.deleteAccountButton.click();
  }

  // Assertions
  async expectNewUserSignupVisible() {
    await expect(this.signupForm).toContainText('New User Signup!');
  }

  async expectAccountInfoPageVisible() {
    await expect(this.enterAccountInfoHeading).toBeVisible();
  }

  async expectAccountCreatedVisible() {
    await expect(this.accountCreatedMessage).toBeVisible();
  }

  async expectEmailAlreadyExists() {
    await expect(this.existingEmailMessage).toBeVisible();
  }

  async expectPageLoaded() {
    await expect(this.page).toHaveURL(/\/login$/);
  }

  async expectLoggedInAsVisible(username: string) {
    await expect(this.loggedInAsText).toContainText(username);
  }

  async expectAccountDeletedVisible() {
    await expect(this.accountDeletedMessage).toBeVisible();
  }
}

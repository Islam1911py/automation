import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // === Locators ===
  get productName() { return this.page.locator('.product-information h2'); }
  get productCategory() { return this.page.locator('.product-information p').filter({ hasText: 'Category:' }); }
  get productPrice() { return this.page.locator('.product-information span span'); }
  get productAvailability() { return this.page.locator('.product-information p').filter({ hasText: 'Availability:' }); }
  get productCondition() { return this.page.locator('.product-information p').filter({ hasText: 'Condition:' }); }
  get productBrand() { return this.page.locator('.product-information p').filter({ hasText: 'Brand:' }); }

  // 👈 العناصر الجديدة الخاصة بـ Test Case 13
  get quantityInput() { return this.page.locator('#quantity'); }
  get addToCartButton() { return this.page.locator('.product-information button.cart'); }
  get viewCartModalLink() { return this.page.getByRole('link', { name: 'View Cart' }); }
  get reviewHeading() { return this.page.getByRole('link', { name: 'Write Your Review' }); }
  get reviewNameInput() { return this.page.getByRole('textbox', { name: 'Your Name' }); }
  get reviewEmailInput() {
    return this.page.getByRole('textbox', { name: 'Email Address', exact: true });
  }
  get reviewTextInput() { return this.page.getByRole('textbox', { name: 'Add Review Here!' }); }
  get submitReviewButton() { return this.page.locator('#button-review'); }
  get reviewSuccessMessage() { return this.page.getByText('Thank you for your review.'); }


  // === Actions ===
  async setQuantity(quantity: number | string) {
    await this.quantityInput.fill('');
    await this.quantityInput.fill(quantity.toString());
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  async clickViewCartModal() {
    await this.viewCartModalLink.click();
  }

  async submitReview(name: string, email: string, review: string) {
    await this.reviewNameInput.fill(name);
    await this.reviewEmailInput.fill(email);
    await this.reviewTextInput.fill(review);
    await this.submitReviewButton.click();
  }


  // === Assertions ===
  async expectProductDetailsVisible() {
    await expect(this.productName).toBeVisible();
    await expect(this.productCategory).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productAvailability).toBeVisible();
    await expect(this.productCondition).toBeVisible();
    await expect(this.productBrand).toBeVisible();
  }

  async expectReviewFormVisible() {
    await expect(this.reviewHeading).toBeVisible();
  }

  async expectReviewSubmitted() {
    await expect(this.reviewSuccessMessage).toBeVisible();
  }
}
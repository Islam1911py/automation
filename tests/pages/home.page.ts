import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get categoriesSidebar() { return this.page.locator('#accordian'); }
  get recommendedItemsHeading() {
    return this.page.getByRole('heading', { name: /recommended items/i });
  }
  get activeRecommendedProductCards() {
    return this.page.locator('.recommended_items .carousel-inner .item.active .product-image-wrapper');
  }
  get scrollUpButton() { return this.page.locator('#scrollUp'); }
  get heroHeading() {
    return this.page.getByRole('heading', {
      name: 'Full-Fledged practice website for Automation Engineers',
      exact: true,
    }).first();
  }

  // Actions
  async openHomePage() {
    await this.goto('/');
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async getFirstRecommendedProductName() {
    return (await this.activeRecommendedProductCards.first().locator('.productinfo p').innerText()).trim();
  }

  async addFirstRecommendedProductToCart() {
    const product = this.activeRecommendedProductCards.first();
    await product.scrollIntoViewIfNeeded();
    await product.hover();
    await product.locator('.add-to-cart').last().click();
  }

  async scrollUpUsingArrow() {
    await this.scrollUpButton.click();
  }

  // Assertions
  async expectHomePageVisible() {
    await expect(this.page).toHaveURL(/automationexercise\.com/);
    await expect(this.heroHeading).toContainText('Full-Fledged practice website for Automation Engineers');
  }

  async expectCategoriesVisible() {
    await expect(this.categoriesSidebar).toBeVisible();
  }

  async expectRecommendedItemsVisible() {
    await expect(this.recommendedItemsHeading).toBeVisible();
    await expect(this.activeRecommendedProductCards.first()).toBeVisible();
  }

  async expectHeroVisible() {
    await expect(this.heroHeading).toBeVisible();
  }
}

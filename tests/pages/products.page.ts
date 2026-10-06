import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  get productsHeading() { return this.page.getByRole('heading', { name: 'All Products' }); }
  get filteredProductsHeading() { return this.page.locator('h2.title.text-center'); }
  get cartLink() { return this.page.locator('header .navbar-nav a[href="/view_cart"]'); }
  get addedToCartMessage() { return this.page.getByText('Added!', { exact: true }); }
  get continueShoppingButton() { return this.page.getByRole('button', { name: 'Continue Shopping' }); }
  get viewCartModalLink() { return this.page.getByRole('link', { name: 'View Cart' }); }
  get searchInput() { return this.page.locator('#search_product'); }
  get searchButton() { return this.page.locator('#submit_search'); }
  get allProductCards() { return this.page.locator('.product-image-wrapper'); }
  get brandLinks() { return this.page.locator('.brands-name a'); }
  get searchedProductsHeading() { return this.page.getByRole('heading', { name: 'Searched Products' }); }

  categoryLink(category: string) {
    return this.page.locator(`#accordian .panel-title a[href="#${category}"]`);
  }

  subCategoryLink(subCategory: string) {
    return this.page
      .locator('#accordian .panel-collapse.in .panel-body a')
      .filter({ hasText: subCategory })
      .first();
  }

  brandLink(brand: string) {
    const escapedBrand = brand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/&/g, '(&|&amp;)');
    return this.brandLinks.filter({ hasText: new RegExp(escapedBrand, 'i') }).first();
  }

  brandProductCount(brand: string) {
    return this.brandLink(brand).locator('span');
  }

  productCard(productName: string) {
    return this.allProductCards.filter({ hasText: productName });
  }

  productAddToCartButton(index = 0) {
    return this.allProductCards
      .nth(index)
      .locator('.productinfo')
      .getByText('Add to cart', { exact: true });
  }

  productHoverAddToCartButton(index = 0) {
    return this.allProductCards.nth(index).getByText('Add to cart', { exact: true }).last();
  }

  addToCartButtonByName(productName: string) {
    return this.productCard(productName)
      .locator('.productinfo')
      .getByText('Add to cart', { exact: true });
  }

  // Actions
  async openProductsPage() {
    await this.goto('/products');
  }

  async selectCategory(category: string, subCategory: string) {
    await this.categoryLink(category).click();
    await this.subCategoryLink(subCategory).click();
  }

  async selectSubCategory(category: string, subCategory: string) {
    await this.selectCategory(category, subCategory);
  }

  async selectBrand(brand: string) {
    await this.brandLink(brand).click();
  }

  async searchProduct(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
  }

  async openProductByIndex(index = 0) {
    await this.allProductCards.nth(index).getByText('View Product', { exact: true }).click();
  }

  async hoverOnProductByIndex(index = 0) {
    await this.allProductCards.nth(index).hover();
  }

  async addProductToCartDirectly(index = 0) {
    const addToCartButton = this.productAddToCartButton(index);
    await addToCartButton.scrollIntoViewIfNeeded();
    await addToCartButton.click();
  }

  async addProductToCartViaHover(index = 0) {
    await this.hoverOnProductByIndex(index);
    await this.productHoverAddToCartButton(index).click();
  }

  async addProductToCartByName(productName: string) {
    await this.addToCartButtonByName(productName).click();
  }

  async clickViewCartModal() {
    await this.viewCartModalLink.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async scrollDown(pixels = 300) {
    await this.page.mouse.wheel(0, pixels);
  }

  // Read-only data helpers
  async getProductNameByIndex(index = 0) {
    return (await this.allProductCards.nth(index).locator('.productinfo p').innerText()).trim();
  }

  async getAllBrands() {
    const brandTexts = await this.brandLinks.allTextContents();
    return brandTexts
      .map((text) => text.replace(/^\s*\(\d+\)\s*/, '').trim())
      .filter(Boolean);
  }

  async getBrandProductCount(brand: string) {
    const countText = await this.brandProductCount(brand).textContent();
    const count = Number(countText?.match(/\d+/)?.[0]);

    if (Number.isNaN(count)) {
      throw new Error(`Could not read product count for brand: ${brand}`);
    }

    return count;
  }

  // Assertions
  async expectAllProductsVisible() {
    await expect(this.productsHeading).toBeVisible();
    await expect(this.allProductCards.first()).toBeVisible();
  }

  async expectCategoryFiltered(category: string, subCategory: string) {
    await expect(this.page).toHaveURL(/\/category_products\//);
    await this.expectFilteredProductsHeading(`${category} - ${subCategory} Products`);
  }

  async expectBrandFiltered(brand: string) {
    await expect(this.page).toHaveURL(/\/brand_products\//);
    await this.expectFilteredProductsHeading(brand);
  }

  async expectBrandProductCount(brand: string) {
    const expectedCount = await this.getBrandProductCount(brand);
    await expect(this.allProductCards).toHaveCount(expectedCount);
  }

  async expectAddedToCartMessageVisible() {
    await expect(this.addedToCartMessage).toBeVisible();
  }

  async expectFilteredProductsHeading(expectedHeading: string) {
    await expect(this.filteredProductsHeading).toBeVisible({ timeout: 10000 });
    const flexibleWhitespaceHeading = expectedHeading
      .trim()
      .split(/\s+/)
      .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('\\s+');
    await expect(this.filteredProductsHeading).toContainText(new RegExp(flexibleWhitespaceHeading, 'i'));
  }

  async expectSearchResultsVisible() {
    await expect(this.page).toHaveURL(/\/products\?search=/);
    await expect(this.searchedProductsHeading).toBeVisible();
  }

  async expectSearchResultsContain(searchTerm: string) {
    await this.expectSearchResultsVisible();
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // The site also matches on category, so not every result card repeats the search term.
    await expect(this.allProductCards.filter({ hasText: new RegExp(escapedSearchTerm, 'i') }).first()).toBeVisible();
  }

  async expectProductVisible(productName: string) {
    await expect(this.productCard(productName)).toBeVisible();
  }
}

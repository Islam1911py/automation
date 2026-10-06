import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // =========================================================================
  // === 1. LOCATORS =========================================================
  // =========================================================================
  get cartRows() { 
    return this.page.locator('#cart_info_table tbody tr'); 
  }

  // Locators بداخل الصف الخاص بمنتج معين عبر الإندكس
  getCartRow(index: number = 0) {
    return this.cartRows.nth(index);
  }

  getProductName(index: number = 0) {
    return this.getCartRow(index).locator('.cart_description h4 a');
  }

  getProductPrice(index: number = 0) {
    return this.getCartRow(index).locator('.cart_price p');
  }

  getProductQuantity(index: number = 0) {
    return this.getCartRow(index).locator('.cart_quantity button');
  }

  getProductTotalPrice(index: number = 0) {
    return this.getCartRow(index).locator('.cart_total .cart_total_price');
  }

  get proceedToCheckoutButton() { return this.page.getByText('Proceed To Checkout', { exact: true }); }
  get removeButtons() { return this.page.locator('.cart_quantity_delete'); }
  get checkoutPromptLoginLink() { return this.page.getByRole('link', { name: 'Register / Login' }); }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async registerOrLoginFromCheckoutPrompt() {
    await this.checkoutPromptLoginLink.click();
  }

  async removeProduct(index: number = 0) {
    await this.removeButtons.nth(index).click();
  }

  // =========================================================================
  // === 2. ASSERTIONS =======================================================
  // =========================================================================
  async expectCartPageLoaded() {
    await expect(this.page).toHaveURL(/\/view_cart/);
  }

  async expectCartProductsCount(expectedCount: number) {
    await expect(this.cartRows).toHaveCount(expectedCount);
  }

  async expectProductQuantity(index: number, expectedQuantity: number) {
    await expect(this.getProductQuantity(index)).toHaveText(String(expectedQuantity));
  }

  async expectProductInCart(productName: string) {
    await expect(this.cartRows.filter({ hasText: productName })).toHaveCount(1);
  }

  async expectCartEmpty() {
    await expect(this.cartRows).toHaveCount(0);
    await expect(this.page.getByText(/Cart is empty/i)).toBeVisible();
  }

  // التحقق الديناميكي من الحسابات والأسعار تلقائياً من غير Hardcoding
  async expectRowTotalIsCorrect(index: number = 0) {
    // 1. التأكد إن اسم المنتج موجود وليس فارغاً
    await expect(this.getProductName(index)).not.toBeEmpty();

    // 2. قراءة السعر من الجدول وتحويله لرقم
    const priceText = await this.getProductPrice(index).textContent();
    const price = Number(priceText?.replace(/[^0-9]/g, ''));

    // 3. قراءة الكمية وتحويلها لرقم
    const quantityText = await this.getProductQuantity(index).textContent();
    const quantity = Number(quantityText?.trim());

    // 4. قراءة الإجمالي المسجل في الجدول وتحويله لرقم
    const totalPriceText = await this.getProductTotalPrice(index).textContent();
    const actualTotalPrice = Number(totalPriceText?.replace(/[^0-9]/g, ''));

    // 5. حساب الإجمالي المتوقع والمقارنة
    const expectedTotalPrice = price * quantity;
    expect(actualTotalPrice).toBe(expectedTotalPrice);
  }

  // التحقق المباشر في حالة معرفة البيانات مسبقاً
  async expectProductDetails(
    index: number,
    expectedDetails: {
      name?: string;
      price?: string;
      quantity?: string;
      totalPrice?: string;
    }
  ) {
    if (expectedDetails.name) {
      await expect(this.getProductName(index)).toHaveText(expectedDetails.name);
    }
    if (expectedDetails.price) {
      await expect(this.getProductPrice(index)).toHaveText(expectedDetails.price);
    }
    if (expectedDetails.quantity) {
      await expect(this.getProductQuantity(index)).toHaveText(expectedDetails.quantity);
    }
    if (expectedDetails.totalPrice) {
      await expect(this.getProductTotalPrice(index)).toHaveText(expectedDetails.totalPrice);
    }
  }
}
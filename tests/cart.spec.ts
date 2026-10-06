import { test } from './fixtures';

test.describe('Test Cases 12–13: Cart', { tag: ['@cart', '@regression'] }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openHomePage();
    await homePage.expectHomePageVisible();
  });

  test('Test Case 12: Add Products in Cart', { tag: ['@TC12', '@smoke'] }, async ({ cartPage, headerComponent, productsPage }) => {
    await headerComponent.clickProducts();
    await productsPage.addProductToCartViaHover(2);
    await productsPage.expectAddedToCartMessageVisible();
    await productsPage.clickContinueShopping();
    await productsPage.addProductToCartViaHover(1);
    await productsPage.expectAddedToCartMessageVisible();
    await productsPage.clickViewCartModal();
    await cartPage.expectCartPageLoaded();
    await cartPage.expectCartProductsCount(2);
    await cartPage.expectRowTotalIsCorrect(0);
    await cartPage.expectRowTotalIsCorrect(1);
  });

  test('Test Case 13: Verify Product quantity in Cart', { tag: '@TC13' }, async ({ productDetailsPage, cartPage, productsPage }) => {
    await productsPage.openProductByIndex(0);
    await productDetailsPage.expectProductDetailsVisible();
    await productDetailsPage.setQuantity(4);
    await productDetailsPage.clickAddToCart();
    await productDetailsPage.clickViewCartModal();
    await cartPage.expectCartPageLoaded();
    await cartPage.expectCartProductsCount(1);
    await cartPage.expectProductQuantity(0, 4);
    await cartPage.expectRowTotalIsCorrect(0);
  });
});

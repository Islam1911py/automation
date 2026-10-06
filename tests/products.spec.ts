import { test } from './fixtures';

test.describe('Test Cases 8–9: Products', { tag: ['@products', '@regression'] }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openHomePage();
    await homePage.expectHomePageVisible();
  });

  test('Test Case 8: Verify All Products and product detail page', { tag: ['@TC08', '@smoke'] }, async ({
    headerComponent, productsPage, productDetailsPage,
  }) => {
    await headerComponent.clickProducts();
    await productsPage.expectAllProductsVisible();
    await productsPage.openProductByIndex(0);
    await productDetailsPage.expectProductDetailsVisible();
  });

  test('Test Case 9: Search Product', { tag: ['@TC09', '@smoke'] }, async ({ headerComponent, productsPage }) => {
    await headerComponent.clickProducts();
    await productsPage.searchProduct('Dress');
    await productsPage.expectSearchResultsContain('Dress');
  });
});

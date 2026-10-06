import { test } from './fixtures';

test.describe('Additional product and subscription validation', { tag: ['@extra', '@regression'] }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openHomePage();
    await homePage.expectHomePageVisible();
  });

  test('Filter products by category', { tag: '@filters' }, async ({ headerComponent, productsPage }) => {
    await headerComponent.clickProducts();
    await productsPage.selectCategory('Women', 'Dress');
    await productsPage.expectCategoryFiltered('Women', 'Dress');
  });

  test('Filter products by brand', { tag: '@filters' }, async ({ headerComponent, productsPage }) => {
    await headerComponent.clickProducts();
    await productsPage.selectBrand('Polo');
    await productsPage.expectBrandFiltered('Polo');
    await productsPage.expectBrandProductCount('Polo');
  });

  test('Verify subscription rejects invalid email', { tag: '@validation' }, async ({ footerComponent }) => {
    await footerComponent.scrollToFooter();
    await footerComponent.subscribeToNewsletter('not-an-email');
    await footerComponent.expectEmailInputRejected();
  });
});

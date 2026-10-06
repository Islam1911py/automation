import { test } from './fixtures';
import { productReview } from './testData';

test.describe('Test Cases 14–26: Ecommerce Journeys', { tag: ['@ecommerce', '@regression'] }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openHomePage();
    await homePage.expectHomePageVisible();
  });

  test('Test Case 14: Place Order - Register while Checkout', { tag: '@TC14' }, async ({
    accountFlows, cartPage, ecommerceFlows, headerComponent, user,
  }) => {
    await headerComponent.clickProducts();
    await ecommerceFlows.addProductToCart();
    await headerComponent.clickCart();
    await cartPage.expectCartPageLoaded();
    await cartPage.proceedToCheckout();
    await cartPage.registerOrLoginFromCheckoutPrompt();
    await accountFlows.registerUser(user);
    await headerComponent.clickCart();
    await ecommerceFlows.checkoutAndPay(user);
    await accountFlows.deleteAccount();
  });

  test('Test Case 15: Place Order - Register before Checkout', { tag: '@TC15' }, async ({
    accountFlows, cartPage, ecommerceFlows, headerComponent, user,
  }) => {
    await accountFlows.registerUser(user);
    await headerComponent.clickProducts();
    await ecommerceFlows.addProductToCart();
    await headerComponent.clickCart();
    await cartPage.expectCartPageLoaded();
    await ecommerceFlows.checkoutAndPay(user);
    await accountFlows.deleteAccount();
  });

  test('Test Case 16: Place Order - Login before Checkout', { tag: '@TC16' }, async ({
    accountFlows, ecommerceFlows, headerComponent, user,
  }) => {
    await accountFlows.registerUser(user);
    await headerComponent.clickLogout();
    await accountFlows.loginAs(user);
    await headerComponent.clickProducts();
    await ecommerceFlows.addProductToCart();
    await headerComponent.clickCart();
    await ecommerceFlows.checkoutAndPay(user);
    await accountFlows.deleteAccount();
  });

  test('Test Case 17: Remove Products From Cart', { tag: '@TC17' }, async ({ cartPage, ecommerceFlows, headerComponent }) => {
    await headerComponent.clickProducts();
    await ecommerceFlows.addProductToCart(0);
    await headerComponent.clickCart();
    await cartPage.expectCartProductsCount(1);
    await cartPage.removeProduct(0);
    await cartPage.expectCartEmpty();
  });

  test('Test Case 18: View Category Products', { tag: '@TC18' }, async ({ homePage, productsPage }) => {
    await homePage.expectCategoriesVisible();
    await productsPage.openProductsPage();
    await productsPage.expectAllProductsVisible();
    await productsPage.selectCategory('Women', 'Dress');
    await productsPage.expectCategoryFiltered('Women', 'Dress');
    await productsPage.selectSubCategory('Men', 'Jeans');
    await productsPage.expectCategoryFiltered('Men', 'Jeans');
  });

  test('Test Case 19: View and Cart Brand Products', { tag: '@TC19' }, async ({ cartPage, headerComponent, productsPage }) => {
    await headerComponent.clickProducts();
    await productsPage.expectAllProductsVisible();
    await productsPage.selectBrand('Polo');
    await productsPage.expectBrandFiltered('Polo');
    await productsPage.expectBrandProductCount('Polo');
    const productName = await productsPage.getProductNameByIndex(0);
    await productsPage.addProductToCartDirectly(0);
    await productsPage.expectAddedToCartMessageVisible();
    await productsPage.clickViewCartModal();
    await cartPage.expectCartProductsCount(1);
    await cartPage.expectProductInCart(productName);
    await headerComponent.clickProducts();
    await productsPage.expectAllProductsVisible();
    await productsPage.selectBrand('H&M');
    await productsPage.expectBrandFiltered('H&M');
    await productsPage.expectBrandProductCount('H&M');
  });

  test('Test Case 20: Search Products and Verify Cart After Login', { tag: '@TC20' }, async ({
    accountFlows, cartPage, headerComponent, loginPage, productsPage, user,
  }) => {
    await accountFlows.registerUser(user);
    await headerComponent.clickLogout();
    await headerComponent.clickProducts();
    await productsPage.expectAllProductsVisible();
    await productsPage.searchProduct('Blue Top');
    await productsPage.expectSearchResultsContain('Blue Top');
    await productsPage.addProductToCartByName('Blue Top');
    await productsPage.expectAddedToCartMessageVisible();
    await productsPage.clickContinueShopping();
    await headerComponent.clickCart();
    await cartPage.expectProductInCart('Blue Top');
    await headerComponent.clickSignupLogin();
    await loginPage.login(user.email, user.password);
    await headerComponent.expectLoggedInAsVisible(user.name);
    await headerComponent.clickCart();
    await cartPage.expectProductInCart('Blue Top');
    await accountFlows.deleteAccount();
  });

  test('Test Case 21: Add review on product', { tag: '@TC21' }, async ({ headerComponent, productsPage, productDetailsPage }) => {
    await headerComponent.clickProducts();
    await productsPage.expectAllProductsVisible();
    await productsPage.openProductByIndex(0);
    await productDetailsPage.expectReviewFormVisible();
    await productDetailsPage.submitReview(productReview.name, productReview.email, productReview.text);
    await productDetailsPage.expectReviewSubmitted();
  });

  test('Test Case 22: Add to cart from Recommended items', { tag: '@TC22' }, async ({ cartPage, homePage, productsPage }) => {
    await homePage.scrollToBottom();
    await homePage.expectRecommendedItemsVisible();
    const productName = await homePage.getFirstRecommendedProductName();
    await homePage.addFirstRecommendedProductToCart();
    await productsPage.expectAddedToCartMessageVisible();
    await productsPage.clickViewCartModal();
    await cartPage.expectCartPageLoaded();
    await cartPage.expectProductInCart(productName);
  });

  test('Test Case 23: Verify address details in checkout page', { tag: '@TC23' }, async ({
    accountFlows, cartPage, checkoutPage, ecommerceFlows, headerComponent, user,
  }) => {
    await accountFlows.registerUser(user);
    await headerComponent.clickProducts();
    await ecommerceFlows.addProductToCart();
    await headerComponent.clickCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.expectCheckoutPageVisible();
    await checkoutPage.expectAddressesMatch(user);
    await accountFlows.deleteAccount();
  });

  test('Test Case 24: Download Invoice after purchase order', { tag: '@TC24' }, async ({
    accountFlows, cartPage, ecommerceFlows, headerComponent, paymentPage, user,
  }) => {
    await headerComponent.clickProducts();
    await ecommerceFlows.addProductToCart();
    await headerComponent.clickCart();
    await cartPage.proceedToCheckout();
    await cartPage.registerOrLoginFromCheckoutPrompt();
    await accountFlows.registerUser(user);
    await headerComponent.clickCart();
    await ecommerceFlows.checkoutAndPay(user);
    await paymentPage.downloadInvoice();
    await paymentPage.continueAfterInvoice();
    await accountFlows.deleteAccount();
  });

  test('Test Case 25: Scroll up using arrow and scroll down', { tag: '@TC25' }, async ({ footerComponent, homePage }) => {
    await homePage.scrollToBottom();
    await footerComponent.expectSubscriptionHeadingVisible();
    await homePage.scrollUpUsingArrow();
    await homePage.expectHeroVisible();
  });

  test('Test Case 26: Scroll up without arrow and scroll down', { tag: '@TC26' }, async ({ footerComponent, homePage }) => {
    await homePage.scrollToBottom();
    await footerComponent.expectSubscriptionHeadingVisible();
    await homePage.scrollToTop();
    await homePage.expectHeroVisible();
  });
});

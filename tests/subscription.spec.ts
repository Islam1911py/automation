import { test } from './fixtures';
import { subscriberEmail } from './testData';

test.describe('Test Cases 10–11: Subscription', { tag: ['@subscription', '@regression'] }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openHomePage();
    await homePage.expectHomePageVisible();
  });

  test('Test Case 10: Verify Subscription in home page', { tag: '@TC10' }, async ({ footerComponent }) => {
    await footerComponent.scrollToFooter();
    await footerComponent.expectSubscriptionHeadingVisible();
    await footerComponent.subscribeToNewsletter(subscriberEmail);
    await footerComponent.expectSubscriptionSuccessMessage();
  });

  test('Test Case 11: Verify Subscription in Cart page', { tag: '@TC11' }, async ({ footerComponent, headerComponent }) => {
    await headerComponent.clickCart();
    await footerComponent.scrollToFooter();
    await footerComponent.subscribeToNewsletter(subscriberEmail);
    await footerComponent.expectSubscriptionSuccessMessage();
  });
});

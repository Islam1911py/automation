import { test } from './fixtures';

test('Test Case 7: Verify Test Cases Page', { tag: ['@TC07', '@navigation', '@regression'] }, async ({ homePage, headerComponent, testCasesPage }) => {
  await homePage.openHomePage();
  await homePage.expectHomePageVisible();
  await headerComponent.clickTestCases();
  await testCasesPage.expectTestCasesPageVisible();
  await testCasesPage.expectInstructionsVisible();
  await testCasesPage.expectAllTestCasesVisible();
});

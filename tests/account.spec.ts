import { test } from './fixtures';
import { invalidCredentials } from './testData';

test.describe('Test Cases 1–5: Account', { tag: ['@account', '@regression'] }, () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.openHomePage();
    await homePage.expectHomePageVisible();
  });

  test('Test Case 1: Register User', { tag: '@TC01' }, async ({ accountFlows, signupPage, user }) => {
    await accountFlows.registerUser(user);
    await accountFlows.deleteAccount();
    await signupPage.clickContinue();
  });

  test('Test Case 2: Login User with correct email and password', { tag: '@TC02' }, async ({
    accountFlows, headerComponent, loginPage, user,
  }) => {
    await accountFlows.registerUser(user);
    await headerComponent.clickLogout();
    await loginPage.expectLoginPageVisible();
    await accountFlows.loginAs(user);
    await accountFlows.deleteAccount();
  });

  test('Test Case 3: Login User with incorrect email and password', { tag: '@TC03' }, async ({ loginPage, user }) => {
    await loginPage.openLoginPage();
    await loginPage.login(user.email, invalidCredentials.password);
    await loginPage.expectInvalidCredentials();
  });

  test('Test Case 4: Logout User', { tag: '@TC04' }, async ({ accountFlows, headerComponent, loginPage, user }) => {
    await accountFlows.registerUser(user);
    await headerComponent.clickLogout();
    await loginPage.expectLoginPageVisible();
    await headerComponent.expectLoggedOut();
    await accountFlows.loginAs(user);
    await accountFlows.deleteAccount();
  });

  test('Test Case 5: Register User with existing email', { tag: '@TC05' }, async ({
    accountFlows, headerComponent, signupPage, user,
  }) => {
    await accountFlows.registerUser(user);
    await headerComponent.clickLogout();
    await signupPage.openSignupPage();
    await signupPage.registerNewUser(user.name, user.email);
    await signupPage.expectEmailAlreadyExists();
    await accountFlows.loginAs(user);
    await accountFlows.deleteAccount();
  });
});

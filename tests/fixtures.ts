import { expect, test as base } from '@playwright/test';
import { FooterComponent } from './components/footer.component';
import { HeaderComponent } from './components/header.component';
import { AccountFlows } from './flows/account.flow';
import { EcommerceFlows } from './flows/ecommerce.flow';
import { CartPage } from './pages/cart.page';
import { CheckoutPage } from './pages/checkout.page';
import { ContactUsPage } from './pages/contact-us.page';
import { HomePage } from './pages/home.page';
import { LoginPage } from './pages/login.page';
import { PaymentPage } from './pages/payment.page';
import { ProductDetailsPage } from './pages/product-details.page';
import { ProductsPage } from './pages/products.page';
import { SignupPage } from './pages/signup.page';
import { TestCasesPage } from './pages/test-cases.page';
import { getRegistrationUser } from './testData';
import type { RegistrationUser } from './testData';

/** Fixtures shared by all Test Specs. Each Page/Component uses the test's isolated Playwright page. */
export type AppFixtures = {
  accountFlows: AccountFlows;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  contactUsPage: ContactUsPage;
  ecommerceFlows: EcommerceFlows;
  footerComponent: FooterComponent;
  headerComponent: HeaderComponent;
  homePage: HomePage;
  loginPage: LoginPage;
  paymentPage: PaymentPage;
  productDetailsPage: ProductDetailsPage;
  productsPage: ProductsPage;
  signupPage: SignupPage;
  testCasesPage: TestCasesPage;
  user: RegistrationUser;
};

export const test = base.extend<AppFixtures>({
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  contactUsPage: async ({ page }, use) => use(new ContactUsPage(page)),
  footerComponent: async ({ page }, use) => use(new FooterComponent(page)),
  headerComponent: async ({ page }, use) => use(new HeaderComponent(page)),
  homePage: async ({ page }, use) => use(new HomePage(page)),
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  paymentPage: async ({ page }, use) => use(new PaymentPage(page)),
  productDetailsPage: async ({ page }, use) => use(new ProductDetailsPage(page)),
  productsPage: async ({ page }, use) => use(new ProductsPage(page)),
  signupPage: async ({ page }, use) => use(new SignupPage(page)),
  testCasesPage: async ({ page }, use) => use(new TestCasesPage(page)),
  user: async ({}, use) => use(getRegistrationUser()),
  accountFlows: async ({ headerComponent, loginPage, signupPage }, use) =>
    use(new AccountFlows(signupPage, loginPage, headerComponent)),
  ecommerceFlows: async ({ cartPage, checkoutPage, paymentPage, productsPage }, use) =>
    use(new EcommerceFlows(productsPage, cartPage, checkoutPage, paymentPage)),
});

export { expect };

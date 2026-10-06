import type { CartPage } from '../pages/cart.page';
import type { CheckoutPage } from '../pages/checkout.page';
import type { PaymentPage } from '../pages/payment.page';
import type { ProductsPage } from '../pages/products.page';
import { testCard } from '../testData';
import type { RegistrationUser } from '../testData';

export class EcommerceFlows {
  constructor(
    private readonly productsPage: ProductsPage,
    private readonly cartPage: CartPage,
    private readonly checkoutPage: CheckoutPage,
    private readonly paymentPage: PaymentPage,
  ) {}

  async addProductToCart(index = 0) {
    await this.productsPage.expectAllProductsVisible();
    await this.productsPage.addProductToCartDirectly(index);
    await this.productsPage.expectAddedToCartMessageVisible();
    await this.productsPage.clickContinueShopping();
  }

  async checkoutAndPay(user: RegistrationUser) {
    await this.cartPage.proceedToCheckout();
    await this.checkoutPage.expectCheckoutPageVisible();
    await this.checkoutPage.expectAddressesMatch(user);
    await this.checkoutPage.placeOrder('Please process this test order.');
    await this.paymentPage.enterPaymentDetails({
      name: `${user.firstName} ${user.lastName}`,
      ...testCard,
    });
    await this.paymentPage.expectOrderPlaced();
  }
}

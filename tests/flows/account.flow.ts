import type { HeaderComponent } from '../components/header.component';
import type { LoginPage } from '../pages/login.page';
import type { SignupPage } from '../pages/signup.page';
import type { RegistrationUser } from '../testData';

export class AccountFlows {
  constructor(
    private readonly signupPage: SignupPage,
    private readonly loginPage: LoginPage,
    private readonly headerComponent: HeaderComponent,
  ) {}

  async registerUser(user: RegistrationUser) {
    await this.signupPage.openSignupPage();
    await this.signupPage.expectNewUserSignupVisible();
    await this.signupPage.registerNewUser(user.name, user.email);
    await this.signupPage.fillAndSubmitSignup(user);
    await this.signupPage.expectAccountCreatedVisible();
    await this.signupPage.clickContinue();
    await this.headerComponent.expectLoggedInAsVisible(user.name);
  }

  async loginAs(user: RegistrationUser) {
    await this.loginPage.openLoginPage();
    await this.loginPage.login(user.email, user.password);
    await this.headerComponent.expectLoggedInAsVisible(user.name);
  }

  async deleteAccount() {
    await this.headerComponent.clickDeleteAccount();
    await this.signupPage.expectAccountDeletedVisible();
  }
}

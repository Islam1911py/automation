import { Page, Locator } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';

export class BasePage {
  public readonly page: Page;
  public readonly header: HeaderComponent;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
  }

  async goto(path: string = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }
}
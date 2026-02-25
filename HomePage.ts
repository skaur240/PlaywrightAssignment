import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

  private registerLink: Locator;
  private loginLink: Locator;
  private searchInput: Locator;

  constructor(page: Page) {
    super(page);

    this.registerLink = this.page.locator('.ico-register');
    this.loginLink = this.page.locator('.ico-login');
    this.searchInput = this.page.locator('#small-searchterms');
  }

  async navigate() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/nopCommerce/);
  }

  async clickRegister() {
    await this.click(this.registerLink);
  }

  async clickLogin() {
    await this.click(this.loginLink);
  }

  async search(product: string) {
    await this.fill(this.searchInput, product);
    await this.searchInput.press('Enter');
  }
}
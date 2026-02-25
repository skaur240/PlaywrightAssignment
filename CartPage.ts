import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

  private cartLink: Locator;
  private termsCheckbox: Locator;
  private checkoutButton: Locator;

  constructor(page: Page) {
    super(page);

    this.cartLink = this.page.locator('.ico-cart');
    this.termsCheckbox = this.page.locator('#termsofservice');
    this.checkoutButton = this.page.locator('#checkout');
  }

  async openCart() {
    await this.click(this.cartLink);
    await this.verifyUrlContains('cart');
  }

  async proceedToCheckout() {
    await this.termsCheckbox.check();
    await this.click(this.checkoutButton);
  }
}
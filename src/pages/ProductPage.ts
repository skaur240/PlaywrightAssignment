import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {

  private productTitle: Locator;
  private addToCartButton: Locator;
  private successNotification: Locator;
  private searchResults: Locator;

  constructor(page: Page) {
    super(page);

    this.productTitle = this.page.locator('.product-name h1');
    this.addToCartButton = this.page.locator('button[id^="add-to-cart-button-"]');    this.successNotification = this.page.locator('.bar-notification.success');
    this.searchResults = this.page.locator('.product-item');
  
}

  async validateProductDetails() {
    await expect(this.productTitle).toBeVisible();
  }

  async addToCart() {
    await this.validateProductDetails();
    await this.click(this.addToCartButton);
    await expect(this.successNotification).toBeVisible({ timeout: 60000 });
  }
  async selectFirstProduct() {
    await this.searchResults.first().click();
  }
}
import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {

  private searchResults: Locator;

  constructor(page: Page) {
    super(page);
    this.searchResults = this.page.locator('.product-item');
  }

  async verifyResults() {
    await this.verifyUrlContains('search');
    await expect(this.searchResults.first()).toBeVisible();
  }

  async selectFirstProduct() {
    await this.searchResults.first().click();
  }
  async searchProduct(product: string) {
    await this.page.fill('#small-searchterms', product);
    await this.page.press('#small-searchterms', 'Enter');

    await this.verifyUrlContains('search');
    await expect(this.page.locator('.product-item').first()).toBeVisible();
  }
  
}
import { Page, expect, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async click(locator: Locator) {
    await expect(locator).toBeVisible({ timeout: 60000 });
    await locator.click();
  }

  protected async fill(locator: Locator, value: string) {
    await expect(locator).toBeVisible();
    await locator.fill(value);
  }

  async verifyUrlContains(text: string) {
    await expect(this.page).toHaveURL(new RegExp(text));
  }
}
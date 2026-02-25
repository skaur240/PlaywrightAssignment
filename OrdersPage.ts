import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OrdersPage extends BasePage {

  private accountLink: Locator;
  private ordersLink: Locator;
  private orderItem: Locator;

  constructor(page: Page) {
    super(page);

    this.accountLink = page
    .locator('.header-links')
    .getByRole('link', { name: 'My account' });

  this.ordersLink = page
    .locator('.account-navigation')
    .getByRole('link', { name: 'Orders' });

  this.orderItem = page.locator('.order-item');
  }

  async navigateToOrders() {
    await this.accountLink.click();
     await this.page.goto('/order/history');

  await expect(this.page).toHaveURL(/order\/history/);

  await expect(
    this.page.locator('.order-list')
  ).toBeVisible({ timeout: 60000 });
  }

  async validateLatestOrder() {
    await expect(this.orderItem.first()).toBeVisible();
  }
}
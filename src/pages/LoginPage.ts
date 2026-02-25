import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  private email: Locator;
  private password: Locator;
  private loginButton: Locator;
  private logoutLink: Locator;

  constructor(page: Page) {
    super(page);   // ✅ pass page to base

    this.email = this.page.locator('#Email');
    this.password = this.page.locator('#Password');
    this.loginButton = this.page.locator('button.login-button');
    this.logoutLink = this.page.locator('.ico-logout');
  }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
    await expect(this.logoutLink).toBeVisible();
  }
  async logout() {
    await this.click(this.logoutLink);
    await expect(this.page.locator('.ico-login')).toBeVisible();
  }
}
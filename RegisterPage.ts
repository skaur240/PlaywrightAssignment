import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {

  private firstName: Locator;
  private lastName: Locator;
  private email: Locator;
  private password: Locator;
  private confirmPassword: Locator;
  private registerButton: Locator;
  private successMessage: Locator;
  private logoutLink: Locator;

  constructor(page: Page) {
    super(page);

    this.firstName = this.page.locator('#FirstName');
    this.lastName = this.page.locator('#LastName');
    this.email = this.page.locator('#Email');
    this.password = this.page.locator('#Password');
    this.confirmPassword = this.page.locator('#ConfirmPassword');
    this.registerButton = this.page.locator('#register-button');
    this.successMessage = this.page.locator('.result');
    this.logoutLink = this.page.locator('.ico-logout');

  }

  async navigateToRegister() {
    await this.page.click('text=Register');
  }
  async registerUser(email: string, password: string) {
    await this.fill(this.firstName, 'Test');
    await this.fill(this.lastName, 'User');
    await this.fill(this.email, email);
    await this.fill(this.password, password);
    await this.fill(this.confirmPassword, password);

    await this.click(this.registerButton);

    await expect(this.successMessage)
      .toHaveText('Your registration completed');
  }
  async logout() {
    await this.click(this.logoutLink);
    await expect(this.page.locator('.ico-login')).toBeVisible();
  }
  
}
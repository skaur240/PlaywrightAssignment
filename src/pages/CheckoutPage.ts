import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {

  private billingContinue: Locator;
  private shippingMethodContinue: Locator;
  private paymentMethodContinue: Locator;
  private paymentInfoContinue: Locator;
  private confirmOrderButton: Locator;
  private orderCompleted: Locator;

  constructor(page: Page) {
    super(page);

    this.billingContinue = page.locator('#billing-buttons-container button');
    this.shippingMethodContinue = page.locator('#shipping-method-buttons-container button');
    this.paymentMethodContinue = page.locator('#payment-method-buttons-container button');
    this.paymentInfoContinue = page.locator('#payment-info-buttons-container button');
    this.confirmOrderButton = page.locator('button.confirm-order-next-step-button');
    this.orderCompleted = page.locator('.order-completed');
  }

  async completeCheckout() {

    // Billing
    const countryDropdown = this.page.locator('#BillingNewAddress_CountryId');

  

    await countryDropdown.selectOption({ label: 'India' });
    await this.page
  .locator('#BillingNewAddress_StateProvinceId')
  .selectOption({ label: 'Chandigarh' });
    await this.page.fill('#BillingNewAddress_City', 'Chandigarh');
    await this.page.fill('#BillingNewAddress_Address1', 'Test Address');
    await this.page.fill('#BillingNewAddress_ZipPostalCode', '160001');
    await this.page.fill('#BillingNewAddress_PhoneNumber', '9876543210');

   // await this.page.locator('#save-billing-address-button').click();
  
     //await expect(this.billingContinue).toBeVisible();
    await this.billingContinue.last().click();
    //await this.page.pause()

    // Shipping Method
    // Ensure a shipping option is selected
const shippingOption = this.page.locator('input[name="shippingoption"]');
if (!(await shippingOption.first().isChecked())) {
  await shippingOption.first().check();
}
    await expect(this.shippingMethodContinue).toBeVisible();
    await this.shippingMethodContinue.click();

    // Payment Method
    const paymentSection = this.page.locator('#opc-payment_method');
await expect(paymentSection).toBeVisible();

// Ensure a payment option is selected
const paymentOption = this.page.locator('input[name="paymentmethod"]');
if (!(await paymentOption.first().isChecked())) {
  await paymentOption.first().check();
}
    await expect(this.paymentMethodContinue).toBeVisible();
    await this.paymentMethodContinue.click();

    // Payment Info
    await expect(this.page.locator('#opc-payment_info'))
  .toBeVisible();
    await expect(this.paymentInfoContinue).toBeVisible();
    await this.paymentInfoContinue.click();

    // Confirm
    await expect(this.confirmOrderButton).toBeVisible();
    await this.confirmOrderButton.click();

    await expect(this.orderCompleted).toBeVisible();
  }
}
import { test, expect } from '../src/fixtures/pageFixture';
import { test as userTest } from '../src/fixtures/userFixture';
import { test as apiTest } from '../src/fixtures/apiFixture';


test('Complete Order Flow with Fixtures', async ({
  page,
  homePage,
  registerPage,
  loginPage,
  searchPage,
  productPage,
  cartPage,
  checkoutPage,
  ordersPage,
  
}) => {

  await page.goto('https://demo.nopcommerce.com/');
  await expect(page).toHaveTitle(/nopCommerce/);

  // Register
  await registerPage.navigateToRegister();
  const user = {
    email:"test" + Math.floor(Math.random() * 1000) + "@gmail.com",
    password:"Test@1235"}
  await registerPage.registerUser(user.email , user.password);
  await registerPage.logout();

  // Login
  await homePage.clickLogin();
  await loginPage.login(user.email, user.password);

  // Search
  await searchPage.searchProduct('Laptop');

  // Product
  await productPage.selectFirstProduct();
 // await page.pause();
  await productPage.addToCart();

  // Cart
  await cartPage.openCart();
  await cartPage.proceedToCheckout();

  // Checkout (API validation active)
  await checkoutPage.completeCheckout();

  // Orders
  await ordersPage.navigateToOrders();
  await ordersPage.validateLatestOrder();

  // Logout
 await loginPage.logout();
});
import { test as base, expect } from '@playwright/test';

type ApiFixture = {
  listenToCheckoutAPI: void;
};

export const test = base.extend<ApiFixture>({
  listenToCheckoutAPI: async ({ page }, use) => {

    page.on('response', async (response) => {
      if (response.url().includes('checkout')) {
        expect(response.status()).toBe(200);

        const body = await response.text();
        expect(body).toBeTruthy();
      }
    });

    await use();
  },
});

//export const expect = test.expect;
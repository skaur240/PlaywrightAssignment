import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: 2,
  workers: 2,
  use: {
    baseURL: 'https://demo.nopcommerce.com',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [['html'], ['json', { outputFile: 'test-results.json' }]]
});
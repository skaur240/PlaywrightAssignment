import { test as base } from '@playwright/test';
import { generateUniqueUsername } from '../utils/UniqueData';

type UserFixture = {
  user: {
    username: string;
  };
};

export const test = base.extend<UserFixture>({
  user: async ({}, use) => {
    const username = generateUniqueUsername();
    await use({ username });
  },
});

export const expect = test.expect;
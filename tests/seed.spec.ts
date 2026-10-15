import { expect } from '@playwright/test';
import { test } from '../fixtures/PageManager';

test.describe('seed for logged in admin user', () => {
  test('seed using userManagementPage fixture', async ({ userManagementPage }) => {
    await userManagementPage.goto();
  });
});

import { expect } from '@playwright/test';
import { test } from '../fixtures/PageManager';

test.describe('seed for logged in admin user', () => {
  test('seed using jobTitlesPage fixture', async ({ jobTitlesPage }) => {
    await jobTitlesPage.goto();
  });
});

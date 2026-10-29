import { expect } from '@playwright/test';
import { test } from '../fixtures/jobTitle';

test.describe('seed for logged in admin user', () => {
  test('seed using jobTitlesPage fixture', async ({ addJobTitlesPage, jobTitle }) => {
    await addJobTitlesPage.goto();
  });
});

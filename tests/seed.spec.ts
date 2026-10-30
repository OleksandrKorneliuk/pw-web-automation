import { expect } from '@playwright/test';
import { test } from '../fixtures/admin/job/payGrade';

test.describe('seed for logged in admin user', () => {
  test('seed using jobTitlesPage fixture', async ({ payGradesPage, payGrade }) => {
    await payGradesPage.goto();
  });
});

import { test as setup } from '../../fixtures/PageManager';
import { expect } from '@playwright/test';
import 'dotenv/config';

const authFile = 'playwright/.auth/user.json';
const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;

if (!username || !password) {
  throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in the .env file');
}

setup('authenticate', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(username, password);

  await page.waitForURL('**/dashboard/index');

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
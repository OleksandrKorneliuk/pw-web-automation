import { test as setup} from '../../fixtures/PageManager'
import { expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');

  await page.waitForURL('**/dashboard/index');

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
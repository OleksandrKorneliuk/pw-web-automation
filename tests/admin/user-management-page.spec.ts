// spec: specs/user-management-plan.md
// seed: tests/seed.spec.ts

import { expect } from '@playwright/test';
import { test } from '../../fixtures/adminUser';

test.describe('Admin User Management', () => {
  test('Page loads and renders User Management controls', async ({ page, userManagementPage }) => {
    // 1. Open the OrangeHRM admin user management page at /web/index.php/admin/viewSystemUsers.
    await userManagementPage.goto();

    // 2. Verify the page header reads 'System Users'.
    await expect(userManagementPage.header).toBeVisible();
    await expect(userManagementPage.header).toHaveText('System Users');

    // 3. Check that the page contains the Add User button, username search field, employee name filter, role dropdown, status dropdown, and Search button.
    const addUserButton = page.getByRole('button', { name: /add/i });
    const usernameField = page.getByText('Username', { exact: true }).locator('xpath=ancestor::div[contains(@class, "oxd-input-group")]//input');
    const employeeNameField = page.getByRole('textbox', { name: 'Type for hints...' });
    const userRoleDropdown = page.locator('.oxd-form-row').filter({ has: page.getByText('User Role', { exact: true }) }).locator('.oxd-select-text').first();
    const statusDropdown = page.locator('.oxd-form-row').filter({ has: page.getByText('Status', { exact: true }) }).locator('.oxd-select-text').first();
    const searchButton = page.getByRole('button', { name: 'Search' });

    await expect(addUserButton).toBeVisible();
    await expect(addUserButton).toBeEnabled();
    await expect(usernameField).toBeVisible();
    await expect(usernameField).toBeEnabled();
    await expect(employeeNameField).toBeVisible();
    await expect(employeeNameField).toBeEnabled();
    await expect(userRoleDropdown).toBeVisible();
    await expect(userRoleDropdown).toBeEnabled();
    await expect(statusDropdown).toBeVisible();
    await expect(statusDropdown).toBeEnabled();
    await expect(searchButton).toBeVisible();
    await expect(searchButton).toBeEnabled();

    // 4. Verify the table/list of users is visible or empty-state text is displayed depending on seeded data.
    const recordsSummary = page.getByText(/\(\d+\) Records Found|No Records Found|No records found/i);

    await expect(recordsSummary).toBeVisible();
  });

  test('Search by username returns matching user', async ({ page, userManagementPage, adminUser }) => {
    await userManagementPage.goto();

    await userManagementPage.searchUserByUsername(adminUser.username);

    const userRow = userManagementPage.tableCard.filter({ hasText: adminUser.username });
    await expect(userRow).toBeVisible();
    await expect(userRow).toContainText(adminUser.username);
    await expect(page.getByText(adminUser.username).first()).toBeVisible();
  });

  test('Search by employee name uses autocomplete and filter correctly', async ({ page, userManagementPage }) => {
    // 1. Navigate to User Management.
    await userManagementPage.goto();

    // 2. Locate the Employee Name field and type a valid employee name such as a seeded employee full name.
    const employeeNameField = page.getByRole('textbox', { name: 'Type for hints...' });
    // 3. Wait for the type-ahead suggestion to appear.
    await employeeNameField.pressSequentially('Bibbity Boo');
    const suggestion = page.getByRole('option', { name: 'Bibbity Bobbity Boo' });
    await expect(suggestion).toBeVisible();

    // 4. Select the matching suggestion from the dropdown.
    await suggestion.click();

    // 5. Click Search.
    const searchButton = page.getByRole('button', { name: 'Search' });
    await searchButton.click();

    // 6. Review the filtered results.
    const filteredRow = userManagementPage.tableCard.filter({ hasText: 'Bibbity Boo' });
    await expect(filteredRow).toBeVisible();
    await expect(filteredRow).toContainText('Bibbity Boo');
    await expect(page.getByText('(1) Record Found')).toBeVisible();
  });
});

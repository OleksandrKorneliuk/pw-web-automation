// spec: specs/user-management-plan.md
// seed: tests/seed.spec.ts

import { expect } from '@playwright/test';
import { test } from '../../fixtures/adminUser';
import { EditUserPage } from '../../pages/admin/editUserPage';
import { createApiContext } from '../../helpers/apiContext.helper';
import { UserService } from '../../api/services/userService';
import { createRandomUser } from '../factorys/userFactory';
import { UserRole } from '../../enums/userRole';

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
    // 1. Navigate to User Management.
    await userManagementPage.goto();

    // 2. Use a known valid username from the seeded demo data or newly created admin user.
    // 3. Enter the username into the Username field.
    // 4. Click Search.
    // 5. Wait for the results table to refresh.
    await userManagementPage.searchUserByUsername(adminUser.username);

    const userRow = userManagementPage.tableCard.filter({ hasText: adminUser.username });
    await expect(userRow).toBeVisible();
    await expect(userRow).toContainText(adminUser.username);
    await expect(page.getByText(adminUser.username).first()).toBeVisible();
  });

  test('Search by employee name uses autocomplete and filter correctly', async ({ page, userManagementPage, employee }) => {
    // 1. Navigate to User Management.
    const apiContext = await createApiContext();
    const userService = new UserService(apiContext);
    const userData = await createRandomUser(employee, UserRole.ADMIN, true);
    const createdUser = await userService.addUserAndExpect(userData);
    const fullName = `${employee.firstName} ${employee.lastName}`;

    try {
      // 2. Locate the Employee Name field and type a valid employee name such as a seeded employee full name.
      await userManagementPage.goto();
      await userManagementPage.employeeNameTextbox.fill(fullName);

      // 3. Wait for the type-ahead suggestion to appear.
      const suggestion = page.getByRole('option', { name: fullName, exact: true });
      await expect(suggestion).toBeVisible();

      // 4. Select the matching suggestion from the dropdown.
      await suggestion.click();

      // 5. Click Search.
      await userManagementPage.searchButton.click();

      // 6. Review the filtered results.
      const filteredRow = userManagementPage.tableCard.filter({ hasText: fullName });
      await expect(filteredRow).toBeVisible();
      await expect(filteredRow).toContainText(fullName);
      await expect(page.getByText(createdUser.username).first()).toBeVisible();
    } finally {
      await userService.deleteUserAndExpect(createdUser.id);
    }
  });

  test('Add a new system user succeeds with valid data', async ({ page, userManagementPage, addSystemUserPage, employee }) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    const username = `admin_${employee.firstName.toLowerCase()}_${Date.now()}`;
    const password = 'Admin123!';

    // 1. Navigate to User Management.
    await userManagementPage.goto();

    // 2. Click Add.
    await userManagementPage.clickAddButton();

    // 3. Fill in required fields: User Role, Employee Name, Username, Status, Password, Confirm Password.
    await addSystemUserPage.selectUserRoleDropdownMenuIcon.click();
    await addSystemUserPage.adminRoleOption.click();
    await addSystemUserPage.employeeNameTextBox.fill(fullName);
    await page.getByRole('option', { name: fullName, exact: true }).click();
    await addSystemUserPage.selectUserStatusDropdownMenuIcon.click();
    await addSystemUserPage.enabledOption.click();
    await addSystemUserPage.usernameTextbox.fill(username);
    await addSystemUserPage.passwordTextbox.fill(password);
    await addSystemUserPage.confirmPasswordTextbox.fill(password);

    // 4. Use a unique username and a valid employee name from the system.
    // 5. Submit the form.
    await addSystemUserPage.saveButton.click();

    // 6. Wait for the success confirmation message or redirect back to System Users list.
    await expect(addSystemUserPage.successMessage).toBeVisible();

    await userManagementPage.goto();
    await userManagementPage.searchUserByUsername(username);
    await expect(page.getByText(username).first()).toBeVisible();
  });

  test('Edit an existing user and change status', async ({ page, userManagementPage, employee }) => {
    const apiContext = await createApiContext();
    const userService = new UserService(apiContext);
    const userData = await createRandomUser(employee, UserRole.ADMIN, true);
    const createdUser = await userService.addUserAndExpect(userData);

    try {
      // 1. Create or identify an existing user record.
      await userManagementPage.goto();

      // 2. Open the user edit form for that user.
      await userManagementPage.searchUserByUsername(createdUser.username);
      const userRow = userManagementPage.tableCard.filter({ hasText: createdUser.username });
      await expect(userRow).toBeVisible();
      await userRow.locator('i.bi-pencil-fill').click();

      const editUserPage = new EditUserPage(page, createdUser.id);

      // 3. Change the user status from Enabled to Disabled (or vice versa).
      await editUserPage.selectUserStatusDropdownMenuIcon.click();
      await editUserPage.disabledOption.click();

      // 4. Save the changes.
      await editUserPage.saveButton.click();
      await expect(page.getByText(/Successfully Updated|Successfully Saved/i)).toBeVisible();

      // 5. Return to the User Management list and search for the updated user.
      await userManagementPage.goto();
      await userManagementPage.searchUserByUsername(createdUser.username);
      await expect(userManagementPage.tableCard.filter({ hasText: createdUser.username })).toContainText('Disabled');
    } finally {
      await userService.deleteUserAndExpect(createdUser.id);
    }
  });

  test('Delete an existing user is confirmed and removed from the list', async ({ page, userManagementPage, employee }) => {
    const apiContext = await createApiContext();
    const userService = new UserService(apiContext);
    const userData = await createRandomUser(employee, UserRole.ADMIN, true);
    const createdUser = await userService.addUserAndExpect(userData);

    try {
      // 1. Create or identify a user that can be safely deleted.
      await userManagementPage.goto();

      // 2. Open User Management and search for the username.
      await userManagementPage.searchUserByUsername(createdUser.username);
      const userRow = userManagementPage.tableCard.filter({ hasText: createdUser.username });
      await expect(userRow).toBeVisible();

      // 3. Click the delete action for that user.
      await userRow.locator('button').first().click();

      // 4. Confirm the delete prompt.
      await page.getByRole('button', { name: /yes, delete/i }).click();

      // 5. Refresh or re-run the search for the same username.
      await expect(page.getByText('Successfully Deleted')).toBeVisible();
      await userManagementPage.searchUserByUsername(createdUser.username);
      await expect(userManagementPage.tableCard.filter({ hasText: createdUser.username })).toHaveCount(0);
    } finally {
      await userService.deleteUserAndExpect(createdUser.id);
    }
  });

  test('Validation and empty-result handling work correctly', async ({ page, userManagementPage, addSystemUserPage, employee }) => {
    const missingUsername = `missing_user_${Date.now()}`;
    const missingEmployeeName = `Missing Employee ${Date.now()}`;
    const fullName = `${employee.firstName} ${employee.lastName}`;
    const noRecordsMessage = page.getByText(/No Records Found|No records found/i).first();

    // 1. Attempt a search with a username that does not exist.
    await userManagementPage.goto();
    await userManagementPage.usernameTextbox.fill(missingUsername);
    await userManagementPage.searchButton.click();
    await expect(noRecordsMessage).toBeVisible();

    // 2. Attempt a search with an employee name that does not exist.
    await userManagementPage.employeeNameTextbox.fill(missingEmployeeName);
    await userManagementPage.searchButton.click();
    await expect(noRecordsMessage).toBeVisible();

    // 3. Leave required Add User fields blank and click Save.
    await addSystemUserPage.goto();
    await addSystemUserPage.saveButton.click();
    await expect(page.getByText(/Required|required/i).first()).toBeVisible();

    // 4. Try to add a user with mismatched passwords or invalid employee details.
    await addSystemUserPage.selectUserRoleDropdownMenuIcon.click();
    await addSystemUserPage.adminRoleOption.click();
    await addSystemUserPage.employeeNameTextBox.fill(fullName);
    await page.getByRole('option', { name: fullName, exact: true }).click();
    await addSystemUserPage.selectUserStatusDropdownMenuIcon.click();
    await addSystemUserPage.enabledOption.click();
    await addSystemUserPage.usernameTextbox.fill(`validation_${Date.now()}`);
    await addSystemUserPage.passwordTextbox.fill('Password123!');
    await addSystemUserPage.confirmPasswordTextbox.fill('Password321!');
    await addSystemUserPage.saveButton.click();
    await expect(page.getByText(/passwords do not match|Password does not match|Passwords do not match/i)).toBeVisible();
  });
});

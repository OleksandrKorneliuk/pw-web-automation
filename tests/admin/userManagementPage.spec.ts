import { expect } from '@playwright/test';
import { test } from '../../fixtures/adminUser';
import { EditUserPage } from '../../pages/admin/editUserPage';
import { createApiContext } from '../../helpers/apiContext.helper';
import { UserService } from '../../api/services/userService';
import { createRandomUser } from '../factorys/userFactory';
import { UserRole } from '../../enums/userRole';

test.describe('user management page', () => {

    test('add new system user', async ({ addSystemUserPage, userManagementPage, employee }) => {
        await addSystemUserPage.goto();
        await addSystemUserPage.addUserAsAdmin(`${employee.firstName} ${employee.lastName}`);

        await expect(addSystemUserPage.successMessage).toBeVisible();
        await userManagementPage.header.waitFor({ state: 'visible' });
    });

    test('search new system user', async ({ page, userManagementPage, adminUser }) => {
        await userManagementPage.goto();
        await userManagementPage.searchUserByUsername(adminUser.username);
        await expect(page.getByText(adminUser.username).first()).toBeVisible();
    });

    test('edit new admin user', async ({ page, userManagementPage, adminUser }) => {
        const editUserPage = new EditUserPage(page, adminUser.id);
        await editUserPage.goto();
        await editUserPage.setStatusDisable();
        await userManagementPage.header.waitFor({ state: 'visible' });

        await userManagementPage.searchUserByUsername(adminUser.username);
        await expect(userManagementPage.tableCard.filter({ hasText: adminUser.username })).toBeVisible();
        await expect(userManagementPage.tableCard.filter({ hasText: adminUser.username })).toContainText('Disabled');
    });

    test('delete admin role for new user', async ({ page, userManagementPage, employee }) => {
        const apiContext = await createApiContext();

        const userService = new UserService(apiContext);
        const adminUserData = await createRandomUser(employee, UserRole.ADMIN, true);
        const adminUser = await userService.addUserAndExpect(adminUserData);

        await userManagementPage.goto();
        await userManagementPage.deleteSystemUserByUsername(adminUser.username);
        await expect(userManagementPage.successfullyDeletedMessage).toBeVisible();
        await userManagementPage.searchButton.click();
        await expect(page.getByText(adminUser.username)).not.toBeVisible();
    });
});
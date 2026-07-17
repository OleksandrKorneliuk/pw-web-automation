import { expect } from '@playwright/test';
import { test } from '../../fixtures/adminUser'
import { EditUserPage } from '../../pages/admin/editUserPage';

test.describe('user management page', () => {

    test('add new system user', async ({ page, addSystemUserPage, employee }) => {
        await addSystemUserPage.goto()
        await addSystemUserPage.addUserAsAdmin(`${employee.firstName} ${employee.lastName}`)

        expect(await addSystemUserPage.successMessageIsVisible()).toBeTruthy()
        await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();
    })

    test('search new system user', async ({ page, userManagementPage, adminUser }) => {
        await userManagementPage.goto()
        await userManagementPage.searchUserByFullName(adminUser.username)
        await expect(page.getByText(adminUser.username).first()).toBeVisible()
    })

    test('edit new admin user', async ({ page, userManagementPage, adminUser }) => {
        const editUserPage = new EditUserPage(page, adminUser.id)
        await editUserPage.goto()
        await editUserPage.setStatusDisable()
        // await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();

        await userManagementPage.searchUserByFullName(adminUser.username)
        await expect(page.getByText(adminUser.username).nth(1)).toBeVisible();
        await expect(page.getByText('Disabled').first()).toBeVisible();
    })

    test('delete admin role for new user', async ({ page, userManagementPage, adminUser }) => {
        await userManagementPage.goto()
        await userManagementPage.deleteSystemUserByFulName(adminUser.username)
        await expect(page.getByText('Successfully Deleted')).toBeVisible()
        await page.getByRole('button', { name: 'Search' }).click()
        await expect(page.getByText(adminUser.username)).not.toBeVisible()
    })
})
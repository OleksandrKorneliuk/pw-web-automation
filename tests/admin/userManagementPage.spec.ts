import { test, expect } from '@playwright/test'
import { PimPage } from '../../pages/pim/pimPage';
import { faker } from '@faker-js/faker'
import { LoginPage } from '../../pages/loginPage';
import { NavigationBar } from '../../pages/components/navigationBar';
import { UserManagementPage } from '../../pages/admin/userManagementPage';
import { NavigationBarItem } from '../../enums/pages/navigationBarItem';

let firstName: string
let lastName: string
let userFullName: string
let employeeId: string

test.describe('user management page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        let loginPage = new LoginPage(page)
        await loginPage.login('Admin', 'admin123');

        const pimPage = new PimPage(page)
        const addEmployeePage = await pimPage.navigateToAddEmployeeTab();

        firstName = faker.person.firstName()
        lastName = faker.person.lastName()
        userFullName = `${firstName} ${lastName}`
        employeeId = '9' + faker.string.numeric(8)
        await addEmployeePage.createEmployee(firstName, lastName, employeeId);
    })

    test('add new system user', async ({ page }) => {
        const navigationBar = new NavigationBar(page)
        await navigationBar.clickOnSection(NavigationBarItem.Admin)
        const userManagementPage = new UserManagementPage(page)
        const addSystemUserPage = await userManagementPage.clickAddButton();
        await addSystemUserPage.addUserAsAdmin(userFullName)

        await page.waitForTimeout(1000)
        await expect(page.getByText('Successfully Saved')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();
    })

    test('search new system user', async ({ page }) => {
        const navigationBar = new NavigationBar(page)
        await navigationBar.clickOnSection(NavigationBarItem.Admin)
        const userManagementPage = new UserManagementPage(page)
        const addSystemUserPage = await userManagementPage.clickAddButton()
        await addSystemUserPage.addUserAsAdmin(userFullName)

        await navigationBar.clickOnSection(NavigationBarItem.Admin)
        await userManagementPage.searchUserByFullName(userFullName)
        await expect(page.getByText(userFullName).first()).toBeVisible()
    })

    test('edit new admin user', async ({ page }) => {
        const navigationBar = new NavigationBar(page)
        await navigationBar.clickOnSection(NavigationBarItem.Admin)
        const userManagementPage = new UserManagementPage(page)
        const addSystemUserPage = await userManagementPage.clickAddButton()
        await addSystemUserPage.addUserAsAdmin(userFullName)

        await navigationBar.clickOnSection(NavigationBarItem.Admin)

        const editUserPage = await userManagementPage.gotToEditUserPageForUser(userFullName)
        await expect(page.getByRole('heading', { name: 'Edit User' })).toBeVisible();

        await editUserPage.setStatusDisable()
        await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();

        await userManagementPage.searchUserByFullName(userFullName)
        await expect(page.getByText(userFullName).first()).toBeVisible();
        await expect(page.getByText('Disabled')).toBeVisible();
    })

    test('delete admin role for new user', async ({ page }) => {
        const navigationBar = new NavigationBar(page)
        await navigationBar.clickOnSection(NavigationBarItem.Admin)
        const userManagementPage = new UserManagementPage(page)
        const addSystemUserPage = await userManagementPage.clickAddButton()
        await addSystemUserPage.addUserAsAdmin(userFullName)

        await navigationBar.clickOnSection(NavigationBarItem.Admin)

        await userManagementPage.deleteSystemUserByFulName(userFullName)
        await expect(page.getByText('Successfully Deleted')).toBeVisible()
        await page.getByRole('button', { name: 'Search' }).click()
        await expect(page.getByText(userFullName)).not.toBeVisible()
    })

    test.afterEach(async ({ page }) => {
        const navigationBar = new NavigationBar(page)
        await navigationBar.clickOnSection(NavigationBarItem.PIM)
        const pimPage = new PimPage(page)
        const employeeListPage = await pimPage.navigateToEmployeeListTab();

        await employeeListPage.deleteEmployeeById(employeeId);
    })
})
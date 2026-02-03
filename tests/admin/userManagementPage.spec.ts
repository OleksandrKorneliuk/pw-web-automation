import { expect } from '@playwright/test'
import { test } from '../../test-options';
import { PimPage } from '../../pages/pim/pimPage';
import { faker } from '@faker-js/faker'
import { NavigationBar } from '../../pages/components/NavigationBar';
import { UserManagementPage } from '../../pages/admin/UserManagementPage';
import { NavigationBarItem } from '../../enums/pages/NavigationBarItem';
import { Employee } from '../../models/employee';

test.describe.configure({mode: 'parallel'})

let employee: Employee
let employeeFullName: string

test.describe('user management page', () => {

    test.beforeEach(async ({ page }) => {
        const navigationBar = new NavigationBar(page)
        await navigationBar.clickOnSection(NavigationBarItem.PIM)
        const pimPage = new PimPage(page)
        const addEmployeePage = await pimPage.navigateToAddEmployeeTab();

        employee = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            id: '9' + faker.string.numeric(8)
        }
        employeeFullName = `${employee.firstName} ${employee.lastName}`

        await addEmployeePage.createEmployee(employee.firstName, employee.lastName, employee.id);
    })

    test('add new system user', async ({ page }) => {
        const navigationBar = new NavigationBar(page)
        await navigationBar.clickOnSection(NavigationBarItem.Admin)
        const userManagementPage = new UserManagementPage(page)
        const addSystemUserPage = await userManagementPage.clickAddButton();
        await addSystemUserPage.addUserAsAdmin(employeeFullName)

        expect(await addSystemUserPage.successMessageIsVisible()).toBeTruthy()
        await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();
    })

    test('search new system user', async ({ page }) => {
        const navigationBar = new NavigationBar(page)
        await navigationBar.clickOnSection(NavigationBarItem.Admin)
        const userManagementPage = new UserManagementPage(page)
        const addSystemUserPage = await userManagementPage.clickAddButton()
        await addSystemUserPage.addUserAsAdmin(employeeFullName)

        await navigationBar.clickOnSection(NavigationBarItem.Admin)
        await userManagementPage.searchUserByFullName(employeeFullName)
        await expect(page.getByText(employeeFullName).first()).toBeVisible()
    })

    test('edit new admin user', async ({ page }) => {
        const navigationBar = new NavigationBar(page)
        await navigationBar.clickOnSection(NavigationBarItem.Admin)
        const userManagementPage = new UserManagementPage(page)
        const addSystemUserPage = await userManagementPage.clickAddButton()
        await addSystemUserPage.addUserAsAdmin(employeeFullName)

        await navigationBar.clickOnSection(NavigationBarItem.Admin)

        const editUserPage = await userManagementPage.gotToEditUserPageForUser(employeeFullName)
        await expect(page.getByRole('heading', { name: 'Edit User' })).toBeVisible();

        await editUserPage.setStatusDisable()
        await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();

        await userManagementPage.searchUserByFullName(employeeFullName)
        await expect(page.getByText(employeeFullName).first()).toBeVisible();
        await expect(page.getByText('Disabled')).toBeVisible();
    })

    test('delete admin role for new user', async ({ page }) => {
        const navigationBar = new NavigationBar(page)
        await navigationBar.clickOnSection(NavigationBarItem.Admin)
        const userManagementPage = new UserManagementPage(page)
        const addSystemUserPage = await userManagementPage.clickAddButton()
        await addSystemUserPage.addUserAsAdmin(employeeFullName)

        await navigationBar.clickOnSection(NavigationBarItem.Admin)

        await userManagementPage.deleteSystemUserByFulName(employeeFullName)
        await expect(page.getByText('Successfully Deleted')).toBeVisible()
        await page.getByRole('button', { name: 'Search' }).click()
        await expect(page.getByText(employeeFullName)).not.toBeVisible()
    })

    test.afterEach(async ({ page }) => {
        const navigationBar = new NavigationBar(page)
        await navigationBar.clickOnSection(NavigationBarItem.PIM)
        const pimPage = new PimPage(page)
        const employeeListPage = await pimPage.navigateToEmployeeListTab();

        await employeeListPage.deleteEmployeeById(employee.id);
    })
})
import { expect } from '@playwright/test'
import { test } from '../../fixtures/login';
import { PimPage } from '../../pages/pim/pimPage';
import { UserManagementPage } from '../../pages/admin/userManagementPage';
import { Employee } from '../../models/employee';
import { NavigationBarItem } from '../../enums/NavigationBarItem';
import { createRandomEmployee } from '../factorys/EmployeeFactory';

test.describe('user management page', () => {

    let employee: Employee
    let employeeFullName: string

    test.beforeEach(async ({ page, navigationBar }) => {
        await navigationBar.clickOnSection(NavigationBarItem.PIM)
        const pimPage = new PimPage(page)
        const addEmployeePage = await pimPage.navigateToAddEmployeeTab();

        employee = await createRandomEmployee()
        employeeFullName = `${employee.firstName} ${employee.lastName}`

        await addEmployeePage.createEmployee(employee.firstName, employee.lastName, employee.id);
    })

    test('add new system user', async ({ page, navigationBar }) => {
        await navigationBar.clickOnSection(NavigationBarItem.ADMIN)
        const userManagementPage = new UserManagementPage(page)
        const addSystemUserPage = await userManagementPage.clickAddButton();
        await addSystemUserPage.addUserAsAdmin(employeeFullName)

        expect(await addSystemUserPage.successMessageIsVisible()).toBeTruthy()
        await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();
    })

    test('search new system user', async ({ page, navigationBar }) => {
        await navigationBar.clickOnSection(NavigationBarItem.ADMIN)
        const userManagementPage = new UserManagementPage(page)
        const addSystemUserPage = await userManagementPage.clickAddButton()
        await addSystemUserPage.addUserAsAdmin(employeeFullName)

        await navigationBar.clickOnSection(NavigationBarItem.ADMIN)
        await userManagementPage.searchUserByFullName(employeeFullName)
        await expect(page.getByText(employeeFullName).first()).toBeVisible()
    })

    test('edit new admin user', async ({ page, navigationBar }) => {
        await navigationBar.clickOnSection(NavigationBarItem.ADMIN)
        const userManagementPage = new UserManagementPage(page)
        const addSystemUserPage = await userManagementPage.clickAddButton()
        await addSystemUserPage.addUserAsAdmin(employeeFullName)

        await navigationBar.clickOnSection(NavigationBarItem.ADMIN)

        const editUserPage = await userManagementPage.gotToEditUserPageForUser(employeeFullName)
        await expect(page.getByRole('heading', { name: 'Edit User' })).toBeVisible();

        await editUserPage.setStatusDisable()
        await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();

        await userManagementPage.searchUserByFullName(employeeFullName)
        await expect(page.getByText(employeeFullName).first()).toBeVisible();
        await expect(page.getByText('Disabled')).toBeVisible();
    })

    test('delete admin role for new user', async ({ page, navigationBar }) => {
        await navigationBar.clickOnSection(NavigationBarItem.ADMIN)
        const userManagementPage = new UserManagementPage(page)
        const addSystemUserPage = await userManagementPage.clickAddButton()
        await addSystemUserPage.addUserAsAdmin(employeeFullName)

        await navigationBar.clickOnSection(NavigationBarItem.ADMIN)

        await userManagementPage.deleteSystemUserByFulName(employeeFullName)
        await expect(page.getByText('Successfully Deleted')).toBeVisible()
        await page.getByRole('button', { name: 'Search' }).click()
        await expect(page.getByText(employeeFullName)).not.toBeVisible()
    })

    test.afterEach(async ({ page, navigationBar }) => {
        await navigationBar.clickOnSection(NavigationBarItem.PIM)
        const pimPage = new PimPage(page)
        const employeeListPage = await pimPage.navigateToEmployeeListTab();

        await employeeListPage.deleteEmployeeById(employee.id);
    })
})
import { test, expect } from '@playwright/test'
import { PimPage } from '../../pages/pim/pimPage';
import { faker } from '@faker-js/faker'
import { LoginPage } from '../../pages/loginPage';
import { NavigationComponent } from '../../pages/components/navigationComponent';
import { UserManagementPage } from '../../pages/admin/userManagementPage';

let firstName: string
let lastName: string
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
        employeeId = '9' + faker.string.numeric(8)
        await addEmployeePage.createEmployee(firstName, lastName, employeeId);
    })

    test('add new system user', async ({ page }) => {
        const navigationBar = new NavigationComponent(page)
        await navigationBar.clickOnSection('Admin')
        const userManagementPage = new UserManagementPage(page)
        const addSystemUserPage = await userManagementPage.clickAddButton();
        await addSystemUserPage.addUserAsAdmin(`${firstName} ${lastName}`)

        await page.waitForTimeout(1000)
        await expect(page.getByText('Successfully Saved')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'System Users' })).toBeVisible();
    })

    test.afterEach(async ({ page }) => {
        const navigationBar = new NavigationComponent(page)
        await navigationBar.clickOnSection('PIM')
        const pimPage = new PimPage(page);
        const employeeListPage = await pimPage.navigateToEmployeeListTab();

        await employeeListPage.deleteEmployeeById(employeeId);
        await expect(page.getByText('Successfully Deleted')).toBeVisible();
    })
})
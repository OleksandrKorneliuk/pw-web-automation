import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { PimPage } from '../../pages/pim/pimPage';

test.describe('PIM Page Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        let loginPage = new LoginPage(page);
        await loginPage.login('Admin', 'admin123');
    });

    test('should navigate to Add Employee tab', async ({ page }) => {
        const pimPage = new PimPage(page);
        await pimPage.navigateToAddEmployeeTab();
        await expect(page).toHaveURL(/\/pim\/addEmployee$/);
    });

    test('should add a new employee', async ({ page }) => {
        const pimPage = new PimPage(page);
        const addEmployeePage = await pimPage.navigateToAddEmployeeTab();

        await addEmployeePage.createEmployee('John', 'Doe', '3436738');

        await expect(page.getByText('Successfully Saved')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
    });

    test('searching for a new employee', async ({ page }) => {
        const pimPage = new PimPage(page);
        const employeeListPage = await pimPage.navigateToEmployeeListTab();
        await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();

        await employeeListPage.searchEmployeeByName('John Doe');
        await expect(page.getByText('12345')).toBeVisible();
    });

    test('deleting an employee', async ({ page }) => {
        const pimPage = new PimPage(page);
        const employeeListPage = await pimPage.navigateToEmployeeListTab();

        await employeeListPage.deleteEmployeeByName('John Doe');
        await expect(page.getByText('Successfully Deleted')).toBeVisible();
    });
});
import { expect } from '@playwright/test';
import { test } from '../../test-options'
import { faker } from '@faker-js/faker'
import { PimPage } from '../../pages/pim/pimPage';
import { NavigationBar } from '../../pages/components/navigationBar';
import { NavigationBarItem } from '../../enums/pages/NavigationBarItem';

test.describe('PIM Page Tests', () => {

    test('should navigate to Add Employee tab', async ({ page }) => {
        const navbar = new NavigationBar(page)
        await navbar.clickOnSection(NavigationBarItem.PIM)
        const pimPage = new PimPage(page);
        await pimPage.navigateToAddEmployeeTab();
        await expect(page).toHaveURL(/\/pim\/addEmployee$/);
    });

    test('add a new employee', async ({ page }) => {
        const navbar = new NavigationBar(page)
        await navbar.clickOnSection(NavigationBarItem.PIM)
        const pimPage = new PimPage(page);
        const addEmployeePage = await pimPage.navigateToAddEmployeeTab();

        let firstName = faker.person.firstName()
        let lastName = faker.person.lastName()
        let employeeId = '9' + faker.string.numeric(8)
        await addEmployeePage.createEmployee(firstName, lastName, employeeId);

        await expect(page.getByText('Successfully Saved')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
    });

    test('searching for a new employee', async ({ page }) => {
        const navbar = new NavigationBar(page)
        await navbar.clickOnSection(NavigationBarItem.PIM)
        const pimPage = new PimPage(page);
        const addEmployeePage = await pimPage.navigateToAddEmployeeTab();

        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const employeeId = '9' + faker.string.numeric(8)
        await addEmployeePage.createEmployee(firstName, lastName, employeeId);

        // await expect(page.getByText('Successfully Saved')).toBeVisible();
        // await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();

        const employeeListPage = await pimPage.navigateToEmployeeListTab();
        await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();

        const employeeFullName = `${firstName} ${lastName}`
        await employeeListPage.searchEmployeeByName(employeeFullName);
        await expect(page.getByText(employeeId)).toBeVisible();
    });

    test('deleting an employee', async ({ page }) => {
        const navbar = new NavigationBar(page)
        await navbar.clickOnSection(NavigationBarItem.PIM)
        const pimPage = new PimPage(page);
        const addEmployeePage = await pimPage.navigateToAddEmployeeTab();

        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()
        const employeeId = '9' + faker.string.numeric(8)
        await addEmployeePage.createEmployee(firstName, lastName, employeeId);

        // await expect(page.getByText('Successfully Saved')).toBeVisible();
        // await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();

        const employeeListPage = await pimPage.navigateToEmployeeListTab();
        const employeeFullName = `${firstName} ${lastName}`
        await employeeListPage.deleteEmployeeByName(employeeFullName);
        await expect(page.getByText('Successfully Deleted')).toBeVisible();
    });
});
import { expect } from '@playwright/test';
import { test } from '../../fixtures/employee'
import { NavigationBarItem } from '../../enums/navigationBarItem'
import { createRandomEmployee } from '../factorys/employeeFactory';
import { AddEmployeePage } from '../../pages/pim/addEmployeePage';
import { EmployeeListPage } from '../../pages/pim/employeeListPage';
import { Employee } from '../../models/employee';

test.describe('PIM Page Tests', () => {

    test('should navigate to Add Employee tab', async ({ page, navigationBar, pimPage }) => {
        await navigationBar.clickOnSection(NavigationBarItem.PIM)
        await pimPage.navigateToAddEmployeeTab();
        await expect(page).toHaveURL(/\/pim\/addEmployee$/);
    });

    test('add a new employee', async ({ page, addEmployeePage, employeeListPage }) => {
        await addEmployeePage.goto()
        const employee = await createEmployee(addEmployeePage);

        await expect(page.getByText('Successfully Saved')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();

        await deleteEmployee(employee, employeeListPage);
        await expect(page.getByText('Successfully Deleted')).toBeVisible();
    });

    test('searching for a new employee by name', async ({ page, employeeListPage, employee }) => {
        await employeeListPage.goto();
        await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();

        const employeeFullName = `${employee.firstName} ${employee.lastName}`
        await employeeListPage.searchEmployeeByName(employeeFullName);

        await expect(page.getByText(`${employee.id}`)).toBeVisible();
    });

    test('deleting an employee', async ({ page, addEmployeePage, employeeListPage }) => {
        const employee = await createEmployee(addEmployeePage);
        await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();

        await deleteEmployee(employee, employeeListPage);
        await expect(page.getByText('Successfully Deleted')).toBeVisible();
    });
});

async function createEmployee(addEmployeePage: AddEmployeePage) {
    await addEmployeePage.goto();

    const employee = await createRandomEmployee();
    await addEmployeePage.createEmployee(employee.firstName, employee.lastName, employee.id);
    return employee;
}

async function deleteEmployee(employee: Employee, employeeListPage: EmployeeListPage) {
    await employeeListPage.goto();
    const employeeFullName = `${employee.firstName} ${employee.lastName}`;
    await employeeListPage.deleteEmployeeByName(employeeFullName);
}
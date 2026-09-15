import { expect } from '@playwright/test';
import { test } from '../../fixtures/employee'
import { createRandomEmployee } from '../factorys/employeeFactory';
import { createApiContext } from '../../helpers/apiContext.helper';
import { EmployeeService } from '../../api/services/employeeService';

test.describe('PIM Page Tests', () => {

    test('should navigate to Add Employee tab', async ({ page, pimPage }) => {
        await pimPage.goto();
        await pimPage.navigateToAddEmployeeTab();
        await expect(page).toHaveURL(/\/pim\/addEmployee$/);
    });

    test('add new employee', async ({ page, addEmployeePage }) => {
        const employee = createRandomEmployee();
        await addEmployeePage.goto()
        await addEmployeePage.createEmployee(employee);
        await expect(page.getByText('Successfully Saved')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();

        const createEmployeeResponse = await page.waitForResponse(response => response.url().includes('api/v2/pim/employees') && response.status() === 200);
        const responseBody = await createEmployeeResponse.json();
        employee.number = responseBody.data.empNumber;

        const apiContext = await createApiContext();
        const employeeService = new EmployeeService(apiContext);
        await employeeService.deleteEmployeeAndExpect(employee.number);
    });

    test('searching for a new employee by name', async ({ page, employeeListPage, employee }) => {
        await employeeListPage.goto();
        await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();

        const employeeFullName = `${employee.firstName} ${employee.lastName}`
        await employeeListPage.searchEmployeeByName(employeeFullName);

        await expect(page.getByText(`${employee.id}`)).toBeVisible();
    });

    test('deleting an employee', async ({ page, employeeListPage }) => {
        const apiContext = await createApiContext()

        const employeeService = new EmployeeService(apiContext)
        const randomEmployeeData = createRandomEmployee()
        const employee = await employeeService.createEmployeeAndExpect(randomEmployeeData)

        await employeeListPage.goto();
        const employeeFullName = `${employee.firstName} ${employee.lastName}`;
        await employeeListPage.deleteEmployeeByName(employeeFullName);
        await expect(page.getByText('Successfully Deleted')).toBeVisible();
    });

    // test('add new employee with login details', async ({ page, addEmployeePage, employeeListPage }) => {

    // });
});
import { expect, Page } from '@playwright/test';
import { test } from '../../fixtures/employee';
import { createRandomEmployee } from '../factorys/employeeFactory';
import { createRandomUser } from '../factorys/userFactory';
import { createApiContext } from '../../helpers/apiContext.helper';
import { EmployeeService } from '../../api/services/employeeService';
import { UserRole } from '../../enums/userRole';

test.describe('PIM Page Tests', () => {

    test('should navigate to Add Employee tab', async ({ page, pimPage }) => {
        await pimPage.goto();
        await pimPage.navigateToAddEmployeeTab();
        await expect(page).toHaveURL(/\/pim\/addEmployee$/);
    });

    test('add new employee', async ({ page, addEmployeePage }) => {
        const employee = await createRandomEmployee();
        await addEmployeePage.goto();

        const employeeNumberPromise = interceptEmployeeNumber(page);
        await addEmployeePage.createEmployee(employee);
        await expect.soft(addEmployeePage.successfullySavedWarning).toBeVisible();

        employee.number = await employeeNumberPromise;

        const apiContext = await createApiContext();
        const employeeService = new EmployeeService(apiContext);
        await employeeService.deleteEmployeeAndExpect(employee.number);
    });

    test('searching for a new employee by name', async ({ page, employeeListPage, employee }) => {
        await employeeListPage.goto();
        await expect(page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();

        const employeeFullName = `${employee.firstName} ${employee.lastName}`;
        await employeeListPage.searchEmployeeByName(employeeFullName);

        await expect(page.getByText(`${employee.id}`)).toBeVisible();
    });

    test('deleting an employee', async ({ page, employeeListPage }) => {
        const apiContext = await createApiContext();

        const employeeService = new EmployeeService(apiContext);
        const randomEmployeeData = await createRandomEmployee();
        const employee = await employeeService.createEmployeeAndExpect(randomEmployeeData);

        await employeeListPage.goto();
        const employeeFullName = `${employee.firstName} ${employee.lastName}`;
        await employeeListPage.deleteEmployeeByName(employeeFullName);
        await expect(page.getByText('Successfully Deleted')).toBeVisible();
    });

    test('add new employee with login details', async ({ page, addEmployeePage }) => {
        const employee = await createRandomEmployee();
        const user = await createRandomUser(employee, UserRole.ESS, true);
        await addEmployeePage.goto();

        const employeeNumberPromise = interceptEmployeeNumber(page);
        await addEmployeePage.createEmployeeWithLoginDetails(employee, user);
        await expect.soft(addEmployeePage.successfullySavedWarning).toBeVisible();

        employee.number = await employeeNumberPromise;

        const apiContext = await createApiContext();
        const employeeService = new EmployeeService(apiContext);
        await employeeService.deleteEmployeeAndExpect(employee.number);
    });
});

async function interceptEmployeeNumber(page: Page): Promise<number> {
    const createEmployeeResponse = await page.waitForResponse(
        response => response.url().includes('api/v2/pim/employees')
            && response.status() === 200
            && response.request().method() === 'POST',
        { timeout: 10_000 }
    );
    const responseBody = await createEmployeeResponse.json();
    const empNumber = responseBody.data.empNumber;
    if (empNumber === undefined) {
        throw new Error('Employee number not found in API response. Response data: ' + JSON.stringify(responseBody.data));
    }
    return empNumber;
}

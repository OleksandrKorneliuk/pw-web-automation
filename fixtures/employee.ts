import { test as base } from './PageManager';
import { request, expect } from '@playwright/test';
import { Employee } from '../models/employee'
import { createRandomEmployee } from '../tests/factorys/employeeFactory';

const API_BASE = 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees'

export const test = base.extend<{ employee: Employee }>({
    employee: async ({}, use) => {
        const apiContext = await createApiContext()

        const newEmployee = await createRandomEmployee()
        const postNewEmployeeResponse = await postNewEmployee(apiContext, newEmployee)
        expect(postNewEmployeeResponse.status()).toBe(200)
        const employeeNumber = await getEmployeeNumber(postNewEmployeeResponse)

        await use(newEmployee)

        const deleteResponse = await deleteEmployee(apiContext, employeeNumber)
        expect(deleteResponse.status()).toBe(200)
    }
})

async function createApiContext() {
    return await request.newContext({ storageState: 'playwright/.auth/user.json' });
}

async function postNewEmployee(apiContext: any, newEmployee: Employee) {
    return await apiContext.post(API_BASE, { data: buildEmployeePayload(newEmployee) })
}

function buildEmployeePayload(newEmployee: Employee) {
    return {
        firstName: newEmployee.firstName,
        middleName: '',
        lastName: newEmployee.lastName,
        empPicture: null,
        employeeId: newEmployee.id,
    }
}

async function getEmployeeNumber(postNewEmployeeResponse: any) {
    const body = await postNewEmployeeResponse.json()
    return body.data.empNumber
}

async function deleteEmployee(apiContext: any, employeeNumber: string) {
    return await apiContext.delete(API_BASE, { data: { ids: [employeeNumber] } })
}
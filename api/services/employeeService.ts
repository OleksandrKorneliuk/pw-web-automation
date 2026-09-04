import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { EmployeeApiClient } from "../clients/employeeApiClient";
import { Employee } from "../../models/employee";

export class EmployeeService {
    private client: EmployeeApiClient

    constructor(apiContext: APIRequestContext) {
        this.client = new EmployeeApiClient(apiContext)
    }

    async createEmployeeAndExpect(employee: Employee) {
        const response = await this.client.postEmployee(employee)
        expect(response.status()).toBe(200)
        employee.number = await this.getEmployeeNumber(response)
        return employee;
    }

    private async getEmployeeNumber(postNewEmployeeResponse: APIResponse): Promise<number> {
        const body = await postNewEmployeeResponse.json()
        return Promise.resolve(body.data.empNumber)
    }

    async deleteEmployeeAndExpect(employeeNumber?: number) {
        if (!employeeNumber) {
            throw new Error('Employee number is required to delete an employee')
        }

        const response = await this.client.deleteEmployee(employeeNumber)
        expect(response.status()).toBe(200)
    }
}
import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { EmployeeApiClient } from "../clients/employeeApiClient";

export class EmployeeService {
    private client: EmployeeApiClient

    constructor(apiContext: APIRequestContext) {
        this.client = new EmployeeApiClient(apiContext)
    }

    async createEmployeeAndExpect(employeeData: {firstName: string, lastName: string, id: string}) {
        const response = await this.client.postEmployee(employeeData)
        expect(response.status()).toBe(200)
        const empNumber = await this.getEmployeeNumber(response)
        return await this.getCompletedEmployee(employeeData, empNumber)
    }

    private async getEmployeeNumber(postNewEmployeeResponse: APIResponse): Promise<number> {
        const body = await postNewEmployeeResponse.json()
        return Promise.resolve(body.data.empNumber)
    }

    private async getCompletedEmployee(employeeData: {firstName: string, lastName: string, id: string}, empNumber: number) {
        return {
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            id: employeeData.id,
            number: empNumber
        }
    }

    async deleteEmployeeAndExpect(employeeNumber: number) {
        const response = await this.client.deleteEmployee(employeeNumber)
        expect(response.status()).toBe(200)
    }
}
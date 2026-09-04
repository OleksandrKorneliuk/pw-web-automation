import { BaseApiClient } from "./baseApiClient";
import { Employee } from "../../models/employee";
import { APIRequestContext } from "@playwright/test";

export class EmployeeApiClient extends BaseApiClient {

    private static EMPLOYEES_ENDPOINT = '/pim/employees'
    private static BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2'

    constructor(apiContext: APIRequestContext) {
        super(apiContext, EmployeeApiClient.BASE_URL)
    }

    async postEmployee(employee: Employee) {
        return await this.post(EmployeeApiClient.EMPLOYEES_ENDPOINT,
            EmployeeApiClient.buildEmployeePayload(employee)
        );
    }

    async deleteEmployee(employeeNumber: number) {
        return await this.delete(EmployeeApiClient.EMPLOYEES_ENDPOINT,
            { ids: [employeeNumber] }
        );
    }

    private static buildEmployeePayload(employee: Employee) {
        return {
            firstName: employee.firstName,
            middleName: '',
            lastName: employee.lastName,
            empPicture: null,
            employeeId: employee.id,
        }
    }
}
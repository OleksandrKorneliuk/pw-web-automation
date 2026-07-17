import { test as base } from './PageManager';
import { Employee } from '../models/employee';
import { createRandomEmployeeData } from '../tests/factorys/employeeDataFactory';
import { EmployeeService } from '../api/services/employeeService';
import { createApiContext } from '../helpers/apiContext.helper';

export const test = base.extend<{ employee: Employee }>({
    employee: async ({}, use) => {
        const apiContext = await createApiContext()

        const employeeService = new EmployeeService(apiContext)
        const randomEmployeeData = createRandomEmployeeData()
        const employee = await employeeService.createEmployeeAndExpect(randomEmployeeData)
        
        await use(employee)

        await employeeService.deleteEmployeeAndExpect(employee.number)
    }
})

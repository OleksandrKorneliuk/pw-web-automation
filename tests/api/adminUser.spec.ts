import { test } from '../../fixtures/employee'
import { expect } from '@playwright/test'
import { createApiContext } from '../../helpers/apiContext.helper'
import { createUserData } from '../factorys/userDataFactory'
import { UserRole } from '../../enums/userRole'
import { UserApiClient } from '../../api/clients/userApiClient'

test('create new admin user', async ({ employee }) => {
    const apiContext = await createApiContext()
    const adminUserData = createUserData(employee, UserRole.ADMIN, true)
    const userClient = new UserApiClient(apiContext)
    const response = await userClient.postUser(adminUserData)
    expect(response.status()).toBe(200)
    const body = await response.json()
    const employeeId = body.data.id
    const deleteEmployeeResponse = await userClient.deleteEmployee(employeeId)
    expect(deleteEmployeeResponse.status()).toBe(200)
})
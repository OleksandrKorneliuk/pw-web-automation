import { expect } from '@playwright/test'
import { test } from '../../fixtures/PageManager'
import { createRandomEmployee } from '../factorys/employeeFactory'
// import { validEmployee } from '../../data/vailidEmployee'

test.describe('My Info Page Tests', () => {

    test('personal details are visible', async ({ myInfoPage }) => {
        await myInfoPage.goto()
        expect(await myInfoPage.pageContains('Personal Details'))
        expect(await myInfoPage.pageContains('Employee Full Name'))
        expect(await myInfoPage.pageContains('Employee Id'))
        expect(await myInfoPage.pageContains('Date of Birth'))
    })

    test('editing personal details', async ({ myInfoPage }) => {
        await myInfoPage.goto()
        
        const employee = createRandomEmployee();

        await myInfoPage.setFirstName(employee.firstName)
        await myInfoPage.setLastName(employee.lastName)
        await myInfoPage.setDriversLicenseNumber(employee.driverLicenseNumber)
        await myInfoPage.switchGender(employee.gender)
        await myInfoPage.clickSaveButton()

        await expect(myInfoPage.successfullySavedWarning).toBeVisible()
        await expect(myInfoPage.firstNameTextbox).toHaveValue(employee.firstName)
        await expect(myInfoPage.lastNameTextbox).toHaveValue(employee.lastName)
        await expect(myInfoPage.driverLicenseInput).toHaveValue(employee.driverLicenseNumber)
    })
})
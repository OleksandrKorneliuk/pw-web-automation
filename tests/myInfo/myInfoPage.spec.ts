import { expect } from '@playwright/test'
import { test } from '../../fixtures/PageManager'
import { validEmployee } from '../../data/vailidEmployee'

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
        
        await myInfoPage.setFirstName(validEmployee.firstName)
        await myInfoPage.setLastName(validEmployee.lastName)
        await myInfoPage.setDriversLicenseNumber(validEmployee.driversLicenseNumber)
        await myInfoPage.selectNationality(validEmployee.nationality)
        await myInfoPage.switchGender(validEmployee.gender)
        await myInfoPage.clickSaveButton()

        await expect(myInfoPage.successfullySavedWarning).toBeVisible()
        await expect(myInfoPage.firstNameTextbox).toHaveValue('John')
        await expect(myInfoPage.lastNameTextbox).toHaveValue('Smith')
        await expect(myInfoPage.driverLicenseInput).toHaveValue('B1234567')
        expect(await myInfoPage.pageContains('North Korean'))
    })
})
import { expect } from '@playwright/test'
import { NavigationBarItem } from '../../enums/navigationBarItem'
import { test } from '../../fixtures/PageManager'
import { validEmployee } from '../../data/vailidEmployee'

test.describe('My Info Page Tests', () => {

    test('personal details are visible', async ({ navigationBar, myInfoPage }) => {
        await navigationBar.clickOnSection(NavigationBarItem.MY_INFO)
        expect(await myInfoPage.pageContains('Personal Details'))
        expect(await myInfoPage.pageContains('Employee Full Name'))
        expect(await myInfoPage.pageContains('Employee Id'))
        expect(await myInfoPage.pageContains('Date of Birth'))
    })

    test('editing personal details', async ({ page, navigationBar, myInfoPage }) => {
        await navigationBar.clickOnSection(NavigationBarItem.MY_INFO)
        await myInfoPage.setEmployeeFirstName(validEmployee.firstName)
        await myInfoPage.setEmployeeLastName(validEmployee.lastName)
        await myInfoPage.setEmployeeDriversLicenseNumber(validEmployee.driversLicenseNumber)
        await myInfoPage.selectNationality(validEmployee.nationality)
        await myInfoPage.switchGender(validEmployee.gender)
        await myInfoPage.clickSaveButton()

        await expect(myInfoPage.successfullySavedWarning).toBeVisible()
        expect(await myInfoPage.firstNameTextbox.inputValue()).toBe('John')
        expect(await myInfoPage.lastNameTextbox.inputValue()).toBe('Smith')
        await expect(page.locator('div:nth-child(2) > div > .oxd-input-group > div:nth-child(2) > .oxd-input')).toHaveValue('B1234567')
        expect(await myInfoPage.pageContains('North Korean'))
    })
})
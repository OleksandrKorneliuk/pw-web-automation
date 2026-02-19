import { expect } from '@playwright/test'
import { NavigationBarItem } from '../../enums/NavigationBarItem'
import { test } from '../../fixtures/PageManager'
import { Gender } from '../../enums/pages/myInfo/Genders'

test.describe('My Info Page Tests', () => {

    test('personal details are visible', async ({ page, navigationBar, myInfoPage }) => {
        await navigationBar.clickOnSection(NavigationBarItem.MY_INFO)
        expect(await myInfoPage.pageContains('Personal Details'))
        expect(await myInfoPage.pageContains('Employee Full Name'))
        expect(await myInfoPage.pageContains('Employee Id'))
        expect(await myInfoPage.pageContains('Date of Birth'))
    })

    test('editing personal details', async ({ page, navigationBar, myInfoPage }) => {
        await navigationBar.clickOnSection(NavigationBarItem.MY_INFO)
        await myInfoPage.setEmployeeFirstName('John')
        await myInfoPage.setEmployeeLastName('Smith')
        await myInfoPage.setEmployeeDriversLicenseNumber('B1234567')
        await myInfoPage.selectNationality('North Korean')
        await myInfoPage.switchGender(Gender.MALE)
        await myInfoPage.clickSaveButton()

        await expect(page.getByText('SuccessSuccessfully Updated×')).toBeVisible()
        expect(myInfoPage.firstNameInputEquals('John')).toBeTruthy()
        expect(myInfoPage.lastNameInputEquals('Smith')).toBeTruthy()
        await expect(page.locator('div:nth-child(2) > div > .oxd-input-group > div:nth-child(2) > .oxd-input')).toHaveValue('B1234567')
        await expect(page.locator('#app')).toContainText('North Korean')

    })
})
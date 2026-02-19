import { Locator, Page } from '@playwright/test'
import { BasePage } from '../BasePage';
import { Gender } from '../../enums/pages/myInfo/Genders';

export class MyInfoPage extends BasePage {

    private app: Locator
    private firstNameTextbox: Locator
    private lastNameTextbox: Locator
    private driversLicenseNumberTextbox: Locator
    private selectedNationalityDropdownMenuIcon: Locator
    private targetNationalityOption: Locator
    private genderRadioButton: Locator
    private saveButton: Locator
    private successfullySavedWarning: Locator

    constructor(page: Page) {
        super(page)
        this.app = page.locator('#app')
        this.firstNameTextbox = page.getByRole('textbox', { name: 'First Name' })
        this.lastNameTextbox = page.getByRole('textbox', { name: 'Last Name' })
        this.driversLicenseNumberTextbox = page.locator('.oxd-input.oxd-input--focus')
        this.selectedNationalityDropdownMenuIcon = page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first()
        this.targetNationalityOption = page.getByRole('option')
        this.genderRadioButton = page.locator('label', { has: page.getByRole('radio') })
        this.saveButton = page.locator('form').filter({ hasText: 'Employee Full NameEmployee' }).getByRole('button')
        this.successfullySavedWarning = page.getByText('Successfully Updated×')
    }

    async pageContains(text: string) {
        return await this.app.getByText(text).isVisible()
    }

    async setEmployeeFirstName(firstName: string) {
        await this.firstNameTextbox.click()
        await this.firstNameTextbox.fill(firstName)
    }

    async setEmployeeLastName(lastName: string) {
        await this.lastNameTextbox.click()
        await this.lastNameTextbox.fill(lastName)
    }

    async setEmployeeDriversLicenseNumber(driversLicenseNumber: string) {
        await this.page.locator('div:nth-child(2) > div > .oxd-input-group > div:nth-child(2) > .oxd-input').click();
        await this.driversLicenseNumberTextbox.fill(driversLicenseNumber)
    }

    async selectNationality(nationality: string) {
        await this.selectedNationalityDropdownMenuIcon.click()
        await this.targetNationalityOption.filter({ hasText: nationality }).click()
    }

    async switchGender(gender: Gender) {
        await this.genderRadioButton.getByText(gender, { exact: true }).click()
    }

    async clickSaveButton() {
        await this.saveButton.click()
    }

    async firstNameInputEquals(text: string) {
        return await this.firstNameTextbox.inputValue() === text
    }

    async lastNameInputEquals(text: string) {
        return await this.lastNameTextbox.inputValue() === text
    }

    async driversLicenseNumberInputEquals(text: string) {
        return await this.driversLicenseNumberTextbox.inputValue() === text
    }
}
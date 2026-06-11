import { Locator, Page } from '@playwright/test'
import { BasePage } from '../basePage';
import { Gender } from '../../enums/pages/myInfo/genders';
import * as selectors from '../selectors/myInfoPage.selectors.json'

export class MyInfoPage extends BasePage {

    readonly firstNameTextbox: Locator
    readonly lastNameTextbox: Locator
    readonly targetNationalityOption: Locator
    readonly genderRadioButton: Locator
    readonly saveButton: Locator
    readonly successfullySavedWarning: Locator

    constructor(page: Page) {
        super(page)
        this.firstNameTextbox = page.getByRole('textbox', { name: 'First Name' })
        this.lastNameTextbox = page.getByRole('textbox', { name: 'Last Name' })
        this.targetNationalityOption = page.getByRole('option')
        this.genderRadioButton = page.locator('label', { has: page.getByRole('radio') })
        this.saveButton = page.locator('form').filter({ hasText: 'Employee Full NameEmployee' }).getByRole('button')
        this.successfullySavedWarning = page.getByText('Successfully Updated×')
    }

    get url(): string {
        return 'pim/viewPersonalDetails/empNumber/7'
    }

    async pageContains(text: string): Promise<boolean> {
        return await this.page.locator(selectors.app).getByText(text).isVisible()
    }

    async setEmployeeFirstName(firstName: string): Promise<void> {
        await this.firstNameTextbox.click()
        await this.firstNameTextbox.fill(firstName)
    }

    async setEmployeeLastName(lastName: string): Promise<void> {
        await this.lastNameTextbox.click()
        await this.lastNameTextbox.fill(lastName)
    }

    async setEmployeeDriversLicenseNumber(driversLicenseNumber: string): Promise<void> {
        await this.page.locator('div:nth-child(2) > div > .oxd-input-group > div:nth-child(2) > .oxd-input').click();
        await this.page.locator(selectors.driversLicenseNumberTextbox).fill(driversLicenseNumber)
    }

    async selectNationality(nationality: string): Promise<void> {
        await this.page.locator(selectors.selectedNationalityDropdownMenuIcon).first().click()
        await this.targetNationalityOption.filter({ hasText: nationality }).click()
    }

    async switchGender(gender: Gender): Promise<void> {
        await this.genderRadioButton.getByText(gender, { exact: true }).click()
    }

    async clickSaveButton(): Promise<void> {
        await this.saveButton.click()
    }
}
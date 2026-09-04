import { Locator, Page } from '@playwright/test'
import { BasePage } from '../basePage';
import { Gender } from '../../enums/pages/myInfo/genders';
import * as selectors from '../selectors/myInfoPage.selectors.json'

export class MyInfoPage extends BasePage {

    readonly firstNameTextbox: Locator = this.page.getByRole('textbox', { name: 'First Name' })
    readonly lastNameTextbox: Locator = this.page.getByRole('textbox', { name: 'Last Name' })
    readonly driverLicenseInput: Locator = this.page.locator(selectors.inputGroup).filter({ has: this.page.locator(selectors.driverLicenseNumberLabel) }).locator(selectors.input)
    readonly targetNationalityOption: Locator = this.page.getByRole('option')
    readonly genderRadioButton: Locator = this.page.locator('label', { has: this.page.getByRole('radio') })
    readonly saveButton: Locator = this.page.locator('form').filter({ hasText: 'Employee Full NameEmployee' }).getByRole('button')
    readonly successfullySavedWarning: Locator = this.page.getByText('Successfully Updated×')

    constructor(page: Page) {
        super(page)
    }

    get url(): string {
        return 'pim/viewPersonalDetails/empNumber/7'
    }

    async pageContains(text: string): Promise<boolean> {
        return await this.page.locator(selectors.app).getByText(text).isVisible()
    }

    async setFirstName(firstName: string): Promise<void> {
        await this.firstNameTextbox.click()
        await this.firstNameTextbox.fill(firstName)
    }

    async setLastName(lastName: string): Promise<void> {
        await this.lastNameTextbox.click()
        await this.lastNameTextbox.fill(lastName)
    }

    async setDriversLicenseNumber(driversLicenseNumber: string): Promise<void> {
        await this.driverLicenseInput.click()
        await this.driverLicenseInput.fill(driversLicenseNumber)
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
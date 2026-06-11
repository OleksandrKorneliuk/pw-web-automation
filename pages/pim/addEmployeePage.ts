import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class AddEmployeePage extends BasePage {

    readonly firstNameTextbox: Locator
    readonly lastNameTextbox: Locator
    readonly userIdTextbox: Locator
    readonly saveButton: Locator
    readonly successfullySavedWarning: Locator

    constructor(page: Page) {
        super(page)
        this.firstNameTextbox = this.page.getByRole('textbox', { name: 'First Name' })
        this.lastNameTextbox = this.page.getByRole('textbox', { name: 'Last Name' })
        this.userIdTextbox = this.page.getByRole('textbox').nth(4)
        this.saveButton = this.page.getByRole('button', { name: 'Save' })
        this.successfullySavedWarning = this.page.getByText('Successfully Saved')
    }

    get url(): string {
        return 'pim/addEmployee'
    }

    async createEmployee(firstname: string, lastname: string, id: string) {
        await this.firstNameTextbox.fill(firstname)
        await this.lastNameTextbox.fill(lastname)
        await this.userIdTextbox.fill(id)
        await this.saveButton.click()
        await this.successfullySavedWarning.waitFor({state: 'visible'})
    }

    async successfullySavedWarningIsVisible() {
        await this.successfullySavedWarning.waitFor({state: 'visible'})
        return await this.successfullySavedWarning.isVisible()
    }
}
import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { Employee } from "../../models/employee";

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

    async createEmployee(employee: Employee) {
        await this.firstNameTextbox.fill(employee.firstName)
        await this.lastNameTextbox.fill(employee.lastName)
        await this.userIdTextbox.fill(employee.id.toString())
        await this.saveButton.click()
        await this.successfullySavedWarning.waitFor({state: 'visible'})
    }

    async successfullySavedWarningIsVisible() {
        await this.successfullySavedWarning.waitFor({state: 'visible'})
        return await this.successfullySavedWarning.isVisible()
    }
}
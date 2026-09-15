import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { Employee } from "../../models/employee";

export class AddEmployeePage extends BasePage {

    readonly firstNameTextbox: Locator = this.page.getByRole('textbox', { name: 'First Name' })
    readonly lastNameTextbox: Locator = this.page.getByRole('textbox', { name: 'Last Name' })
    readonly userIdTextbox: Locator = this.page.getByRole('textbox').nth(4)
    readonly saveButton: Locator = this.page.getByRole('button', { name: 'Save' })
    readonly successfullySavedWarning: Locator = this.page.getByText('Successfully Saved')

    constructor(page: Page) {
        super(page)
    }

    get url(): string {
        return 'pim/addEmployee'
    }

    async fillEmployeeFirstName(firstName: string) {
        await this.firstNameTextbox.fill(firstName)
    }

    async fillEmployeeLastName(lastName: string) {
        await this.lastNameTextbox.fill(lastName)
    }

    async fillEmployeeId(id: string) {
        await this.userIdTextbox.fill(id)
    }

    async clickSaveButton() {
        await this.saveButton.click()
    }

    async createEmployee(employee: Employee) {
        await this.fillEmployeeFirstName(employee.firstName)
        await this.fillEmployeeLastName(employee.lastName)
        await this.fillEmployeeId(employee.id)
        await this.clickSaveButton()
        await this.successfullySavedWarning.waitFor({state: 'visible'})
    }

    async successfullySavedWarningIsVisible() {
        await this.successfullySavedWarning.waitFor({state: 'visible'})
        return await this.successfullySavedWarning.isVisible()
    }
}
import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class AddEmployeePage extends BasePage {

    readonly firstNameTextbox: Locator
    readonly lastNameTextbox: Locator
    readonly userIdTextbox: Locator
    readonly saveButton: Locator

    constructor(page: Page) {
        super(page)
        this.firstNameTextbox = this.page.getByRole('textbox', { name: 'First Name' })
        this.lastNameTextbox = this.page.getByRole('textbox', { name: 'Last Name' })
        this.userIdTextbox = this.page.getByRole('textbox').nth(4)
        this.saveButton = this.page.getByRole('button', { name: 'Save' })
    }

    async createEmployee(firstname: string, lastname: string, id: string) {
        await this.firstNameTextbox.fill(firstname)
        await this.lastNameTextbox.fill(lastname)
        await this.userIdTextbox.fill(id)
        await this.saveButton.click()
    }
}
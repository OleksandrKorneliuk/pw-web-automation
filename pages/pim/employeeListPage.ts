import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class EmployeeListPage extends BasePage {

    readonly employeeNameTextbox: Locator = this.page.getByRole('textbox', { name: 'Type for hints...' }).first()
    readonly employeeNameSuggestion: Locator = this.page.getByRole('option')
    readonly searchButton: Locator = this.page.getByRole('button', { name: 'Search' })
    readonly employeeIdTextbox: Locator = this.page.getByRole('textbox').nth(2)
    readonly trashIcon: Locator = this.page.locator('.bi-trash').first()
    readonly confirmDeletionButton: Locator = this.page.getByRole('button', { name: ' Yes, Delete' })

    constructor(page: Page) {
        super(page)
    }

    get url(): string {
        return 'pim/viewEmployeeList'
    }

    async searchEmployeeByName(name: string) {
        await this.employeeNameTextbox.fill(name)
        await this.employeeNameSuggestion.filter({hasText: name}).click();
        await this.searchButton.click();
    }

    async searchEmployeeById(id: string) {
        await this.employeeIdTextbox.fill(id)
        await this.searchButton.click()
    }

    async deleteEmployeeByName(name: string) {
        await this.searchEmployeeByName(name)
        await this.trashIcon.click()
        await this.confirmDeletionButton.click()
    }

    async deleteEmployeeById(id: string) {
        await this.searchEmployeeById(id)
        await this.trashIcon.click()
        await this.confirmDeletionButton.click()
    }
}
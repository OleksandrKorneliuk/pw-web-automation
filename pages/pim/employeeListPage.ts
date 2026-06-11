import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class EmployeeListPage extends BasePage {

    readonly employeeNameTextbox: Locator
    readonly employeeNameSuggestion: Locator
    readonly searchButton: Locator
    readonly employeeIdTextbox: Locator
    readonly trashIcon: Locator
    readonly confirmDeletionButton: Locator

    constructor(page: Page) {
        super(page)
        this.employeeNameTextbox = this.page.getByRole('textbox', { name: 'Type for hints...' }).first()
        this.employeeNameSuggestion = this.page.getByRole('option')
        this.searchButton = this.page.getByRole('button', { name: 'Search' })
        this.employeeIdTextbox = this.page.getByRole('textbox').nth(2)
        this.trashIcon = this.page.locator('.bi-trash').first()
        this.confirmDeletionButton = this.page.getByRole('button', { name: ' Yes, Delete' })
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
import { Locator, Page } from '@playwright/test';
import { BasePage } from '../basePage';

export class UserManagementPage extends BasePage {

    readonly header: Locator
    readonly usernameTextbox: Locator
    readonly employeeNameTextbox: Locator
    readonly addButton: Locator
    readonly searchButton: Locator
    readonly tableCard: Locator
    readonly editEmployeeButton: Locator
    readonly deleteEmployeeButton: Locator
    readonly confirmDeletionButton: Locator
    readonly successfullyDeletedMessage: Locator

    constructor(page: Page) {
        super(page)
        this.header = this.page.getByRole('heading', { name: 'System Users' })
        this.addButton = this.page.getByRole('button').filter({ hasText: ' Add ' })
        this.usernameTextbox = this.page.getByRole('textbox').nth(1)
        this.employeeNameTextbox = this.page.getByRole('textbox', { name: 'Type for hints...'})
        this.searchButton = this.page.getByRole('button', { name: 'Search' })
        this.tableCard = this.page.locator('.oxd-table-card')
        this.editEmployeeButton = this.tableCard.first().locator('i.bi-pencil-fill')
        this.deleteEmployeeButton = this.tableCard.first().locator('button').first()
        this.confirmDeletionButton = this.page.getByRole('button', { name: ' Yes, Delete' })
        this.successfullyDeletedMessage = this.page.getByText('Successfully Deleted')
    }

    get url(): string {
        return 'admin/viewSystemUsers'
    }

    async clickAddButton() {
        await this.addButton.click()
    }

    async goToEditUserPageForUser(fullName: string) {
        await this.searchUserByUsername(fullName)
        await this.editEmployeeButton.click();
    }

    async searchUserByUsername(username: string) {
        await this.usernameTextbox.fill(username)
        await this.searchButton.click()
    }

    async searchUserByEmployeeName(fullName: string) {
        await this.employeeNameTextbox.fill(fullName)
        await this.page.getByRole('option', { name: fullName }).click()
        await this.searchButton.click()
    }

    async deleteSystemUserByUsername(username: string) {
        await this.searchUserByUsername(username)
        await this.tableCard.filter({hasText: username}).locator('button').first().click()
        await this.confirmDeletionButton.click()
    }
}
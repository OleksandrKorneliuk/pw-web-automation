import { Locator, Page } from '@playwright/test';
import { BasePage } from '../basePage';

export class UserManagementPage extends BasePage {

    readonly header: Locator = this.page.getByRole('heading', { name: 'System Users' })
    readonly usernameTextbox: Locator = this.page.getByRole('textbox').nth(1)
    readonly employeeNameTextbox: Locator = this.page.getByRole('textbox', { name: 'Type for hints...'})
    readonly addButton: Locator = this.page.getByRole('button').filter({ hasText: ' Add ' })
    readonly searchButton: Locator = this.page.getByRole('button', { name: 'Search' })
    readonly tableCard: Locator = this.page.locator('.oxd-table-card')
    readonly editEmployeeButton: Locator = this.tableCard.first().locator('i.bi-pencil-fill')
    readonly deleteEmployeeButton: Locator = this.tableCard.first().locator('button').first()
    readonly confirmDeletionButton: Locator = this.page.getByRole('button', { name: ' Yes, Delete' })
    readonly successfullyDeletedMessage: Locator = this.page.getByText('Successfully Deleted')

    constructor(page: Page) {
        super(page)
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
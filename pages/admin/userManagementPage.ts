import { Locator, Page } from '@playwright/test';
import { BasePage } from '../basePage';

export class UserManagementPage extends BasePage {

    readonly usernameTextbox: Locator
    readonly addButton: Locator
    readonly searchButton: Locator
    readonly editEmployeeButton: Locator
    readonly deleteEmployeeButton: Locator
    readonly confirmDeletionButton: Locator

    constructor(page: Page) {
        super(page)
        this.addButton = this.page.getByRole('button').filter({ hasText: ' Add ' })
        this.usernameTextbox = this.page.getByRole('textbox').nth(2)
        this.searchButton = this.page.getByRole('button', { name: 'Search' })
        this.editEmployeeButton = this.page.locator('.oxd-table-card').first().locator('i.bi-pencil-fill')
        this.deleteEmployeeButton = this.page.locator('.oxd-table-card').first().locator('button').first()
        this.confirmDeletionButton = this.page.getByRole('button', { name: ' Yes, Delete' })
    }

    get url(): string {
        return 'admin/viewSystemUsers'
    }

    async clickAddButton() {
        await this.addButton.click()
    }

    async searchUserByFullName(fullName: string) {
        await this.usernameTextbox.fill(fullName)
        await this.page.getByRole('option', { name: fullName }).first().click()
        await this.searchButton.click()
    }

    async gotToEditUserPageForUser(fullName: string) {
        await this.searchUserByFullName(fullName)
        await this.editEmployeeButton.click();
    }

    async deleteSystemUserByFulName(fullName: string) {
        await this.searchUserByFullName(fullName)
        await this.deleteEmployeeButton.click()
        await this.confirmDeletionButton.click()
    }
}
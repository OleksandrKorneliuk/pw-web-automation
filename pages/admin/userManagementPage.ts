import { Page } from '@playwright/test';
import { AddSystenUserPage } from './AddSystemUserPage';
import { EditUserPage } from './EditUserPage';

export class UserManagementPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async clickAddButton() {
        await this.page.getByRole('button').filter({ hasText: ' Add ' }).click()
        return new AddSystenUserPage(this.page)
    }

    async searchUserByFullName(fullName: string) {
        await this.page.getByRole('textbox').nth(2).fill(fullName)
        await this.page.getByRole('option', { name: fullName }).first().click()
        await this.page.getByRole('button', { name: 'Search' }).click()
    }

    async gotToEditUserPageForUser(fullName: string) {
        await this.searchUserByFullName(fullName)
        await this.page.locator('.oxd-table-card').first().locator('i.bi-pencil-fill').click();

        return new EditUserPage(this.page)
    }

    async deleteSystemUserByFulName(fullName: string) {
        await this.searchUserByFullName(fullName)
        await this.page.locator('.oxd-table-card').first().locator('button').first().click()
        await this.page.getByRole('button', { name: ' Yes, Delete' }).click()
    }

}
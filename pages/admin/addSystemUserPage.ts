import {Page} from '@playwright/test';

export class AddSystenUserPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async addUserAsAdmin(fullName: string) {
        await this.page.locator('form i').first().click()
        await this.page.getByRole('option', { name: 'Admin' }).locator('span').click()
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).fill(fullName)
        await this.page.waitForTimeout(5000)
        await this.page.getByRole('option').first().click()
        await this.page.locator('form i').nth(1).click()
        await this.page.getByText('Enabled').click();
        await this.page.getByRole('textbox').nth(2).fill(fullName)
        await this.page.getByRole('textbox').nth(3).fill('admin123')
        await this.page.getByRole('textbox').nth(4).fill('admin123')
        await this.page.getByRole('button', { name: 'Save' }).click()
    }
}
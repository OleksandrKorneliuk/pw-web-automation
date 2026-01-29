import { Page } from "@playwright/test";

export class EditUserPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async setStatusDisable() {
        await this.page.locator('form i').nth(1).click();
        await this.page.getByText('Disabled').click();
        await this.page.getByRole('button', { name: 'Save' }).click();
    }
}
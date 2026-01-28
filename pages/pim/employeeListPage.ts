import { Page } from "@playwright/test";

export class EmployeeListPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async searchEmployeeByName(name: string) {
        await this.page.getByRole('textbox', { name: 'Type for hints...' }).first().fill(name);
        await this.page.getByRole('option', { name: name }).click();
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    async searchEmployeeById(id: string) {
        await this.page.getByRole('textbox').nth(2).fill(id)
        await this.page.getByRole('button', { name: 'Search' }).click();
    }

    async deleteEmployeeByName(name: string) {
        await this.searchEmployeeByName(name);
        await this.page.locator('.bi-trash').click();
        await this.page.getByRole('button', { name: ' Yes, Delete' }).click();
    }

    async deleteEmployeeById(id: string) {
        await this.searchEmployeeById(id);
        await this.page.locator('.bi-trash').first().click();
        await this.page.getByRole('button', { name: ' Yes, Delete' }).click();
    }
}
import { Page } from "@playwright/test";

export class AddEmployeePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async createEmployee(firstname: string, lastname: string, employeeId: string) {
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstname);
        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastname);
        await this.page.getByRole('textbox').nth(4).fill(employeeId);
        await this.page.getByRole('button', { name: 'Save' }).click();
    }
}
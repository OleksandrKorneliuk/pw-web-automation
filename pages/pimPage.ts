import { Page } from "@playwright/test";
import { AddEmployeePage } from "./addEmployeePage";
import { EmployeeListPage } from "./employeeListPage";

export class PimPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToAddEmployeeTab(): Promise<AddEmployeePage> {
        await this.page.getByRole('link', { name: 'PIM' }).click();
        await this.page.getByRole('button', { name: ' Add' }).click();
        return new AddEmployeePage(this.page);
    }

    async navigateToEmployeeListTab(): Promise<EmployeeListPage> {
        await this.page.getByRole('link', { name: 'PIM' }).click();
        return new EmployeeListPage(this.page);
    }
}
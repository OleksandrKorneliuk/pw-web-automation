import { Locator, Page } from "@playwright/test";
import { AddEmployeePage } from "./addEmployeePage";
import { EmployeeListPage } from "./employeeListPage";
import { PimPageItem } from "../../enums/pages/pimPageItem";

export class PimPage {

    readonly page: Page;

    readonly navigationListItem: Locator

    constructor(page: Page) {
        this.page = page;
        this.navigationListItem = this.page.locator('header ul li')
    }

    async navigateToAddEmployeeTab() {
        await this.clickItem(PimPageItem.AddEmployee)
        return new AddEmployeePage(this.page)
    }

    async navigateToEmployeeListTab() {
        await this.clickItem(PimPageItem.EmployeeList)
        return new EmployeeListPage(this.page)
    }

    private async clickItem(listItem: PimPageItem) {
        switch (listItem) {
            case PimPageItem.EmployeeList:
                await this.navigationListItem.nth(2).click()
                break
            case PimPageItem.AddEmployee:
                await this.navigationListItem.nth(3).click()
                break
        }
    }
}
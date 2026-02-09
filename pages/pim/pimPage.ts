import { Locator, Page } from "@playwright/test";
import { PimPageItem } from "../../enums/pages/PimPageItem";
import { BasePage } from "../BasePage";
import { AddEmployeePage } from "./addEmployeePage";
import { EmployeeListPage } from "./employeeListPage";

export class PimPage extends BasePage {

    readonly navigationListItem: Locator

    constructor(page: Page) {
        super(page)
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
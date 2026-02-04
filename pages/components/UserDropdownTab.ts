import { Locator, Page } from "@playwright/test";
import { UserDropdownMenuItem } from "../../enums/pages/userDropdownMenuItem";
import { BasePage } from "../BasePage";

export class UserDropdownTab extends BasePage {

    readonly userDropdownMenu: Locator
    readonly allSections: Locator

    constructor(page: Page) {
        super(page)
        this.userDropdownMenu = this.page.locator('header ul li')
        this.allSections = this.userDropdownMenu.locator('ul li')
    }

    async clickOnUserDropdownMenu() {
        await this.userDropdownMenu.click()
    }

    async clickOnSection(sectionName: UserDropdownMenuItem) {
        await this.allSections.filter({hasText: sectionName}).click()
    }
}
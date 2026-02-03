import { Locator, Page } from "@playwright/test";
import { UserDropdownMenuItem } from "../../enums/pages/userDropdownMenuItem";

export class UserDropdownTab {

    readonly page: Page
    readonly userDropdownMenu: Locator
    readonly allSections: Locator

    constructor(page: Page) {
        this.page = page
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
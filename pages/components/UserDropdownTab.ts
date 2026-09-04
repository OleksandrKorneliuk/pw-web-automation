import { Locator, Page } from "@playwright/test";
import { UserDropdownMenuItem } from "../../enums/userDropdownMenuItem";
import { BaseComponent } from "./baseComponent";

export class UserDropdownTab extends BaseComponent {

    readonly userDropdownMenu: Locator = this.page.locator('header .oxd-topbar-header-userarea li')
    readonly allSections: Locator = this.root.getByRole('menuitem')

    constructor(page: Page) {
        super(page)
    }

    get root(): Locator {
        return this.page.getByRole('menu')
    }

    async clickOnUserDropdownMenu() {
        await this.userDropdownMenu.click()
    }

    async clickOnSection(sectionName: UserDropdownMenuItem) {
        await this.allSections.filter({hasText: sectionName}).click()
    }
}
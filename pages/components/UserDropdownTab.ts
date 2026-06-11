import { Locator, Page } from "@playwright/test";
import { UserDropdownMenuItem } from "../../enums/userDropdownMenuItem";
import { BaseComponent } from "./baseComponent";

export class UserDropdownTab extends BaseComponent {

    readonly userDropdownMenu: Locator
    readonly allSections: Locator

    constructor(page: Page) {
        super(page)
        this.userDropdownMenu = this.page.locator('header ul li')
        this.allSections = this.root.getByRole('menuitem')
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
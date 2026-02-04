import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class EditUserPage extends BasePage {

    readonly selectUserStatusDropdownMenuIcon: Locator
    readonly disabledOption: Locator
    readonly saveButton: Locator

    constructor(page: Page) {
        super(page)
        this.selectUserStatusDropdownMenuIcon = this.page.locator('form i').nth(1)
        this.disabledOption = this.page.getByText('Disabled')
        this.saveButton = this.page.getByRole('button', { name: 'Save' })
    }

    async setStatusDisable() {
        await this.selectUserStatusDropdownMenuIcon.click();
        await this.disabledOption.click();
        await this.saveButton.click();
    }
}
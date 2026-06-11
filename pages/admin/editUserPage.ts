import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class EditUserPage extends BasePage {

    private userId: string

    readonly selectUserStatusDropdownMenuIcon: Locator
    readonly disabledOption: Locator
    readonly saveButton: Locator

    constructor(page: Page, userId: string) {
        super(page)
        this.userId = userId
        this.selectUserStatusDropdownMenuIcon = this.page.locator('form i').nth(1)
        this.disabledOption = this.page.getByText('Disabled')
        this.saveButton = this.page.getByRole('button', { name: 'Save' })
    }

    get url(): string {
        return `admin/saveSystemUser/${this.userId}`
    }

    async setStatusDisable() {
        await this.selectUserStatusDropdownMenuIcon.click();
        await this.disabledOption.click();
        await this.saveButton.click();
    }
}
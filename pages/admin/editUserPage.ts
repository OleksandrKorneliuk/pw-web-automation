import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class EditUserPage extends BasePage {

    private userId: string

    readonly selectUserStatusDropdownMenuIcon: Locator = this.page.locator('form i').nth(1)
    readonly disabledOption: Locator = this.page.getByText('Disabled')
    readonly saveButton: Locator = this.page.getByRole('button', { name: 'Save' })

    constructor(page: Page, userId: string) {
        super(page)
        this.userId = userId
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
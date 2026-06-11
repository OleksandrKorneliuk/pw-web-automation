import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class UpdatePasswordPage extends BasePage {

    readonly title: Locator

    constructor(page: Page) {
        super(page)
        this.title = this.page.locator('h6', {hasText: 'Update Password'})
    }

    get url(): string{
        return 'pim/updatePassword'
    }

    async titleIsVisible() {
        await this.title.waitFor({state: 'visible'})
        return await this.title.isVisible()
    }
}
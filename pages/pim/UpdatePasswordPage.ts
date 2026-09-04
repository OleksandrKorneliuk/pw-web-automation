import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class UpdatePasswordPage extends BasePage {

    readonly title: Locator = this.page.locator('h6', {hasText: 'Update Password'})

    constructor(page: Page) {
        super(page)
    }

    get url(): string{
        return 'pim/updatePassword'
    }
}
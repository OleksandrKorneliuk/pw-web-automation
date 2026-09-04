import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SupportPage extends BasePage {

    readonly title: Locator = this.page.locator('h6', {hasText: 'Getting Started with OrangeHRM'})

    constructor(page: Page) {
        super(page)
    }

    get url(): string {
        return 'help/support'
    }
}
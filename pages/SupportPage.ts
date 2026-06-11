import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SupportPage extends BasePage {

    readonly title: Locator

    constructor(page: Page) {
        super(page)
        this.title = this.page.locator('h6', {hasText: 'Getting Started with OrangeHRM'})
    }

    get url(): string {
        return 'help/support'
    }

    async titleIsVisible() {
        await this.title.waitFor({state: 'visible'})
        return await this.title.isVisible()
    }
}
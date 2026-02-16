import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SupportPage extends BasePage {

    readonly title: Locator

    constructor(page: Page) {
        super(page)
        this.title = this.page.locator('h6', {hasText: 'Getting Started with OrangeHRM'})
    }

    async titleIsVisible() {
        await this.title.waitFor({state: 'visible'})
        return await this.title.isVisible()
    }
}
import { Locator, Page } from "@playwright/test";

export class SupportPage {

    readonly page: Page

    readonly title: Locator

    constructor(page: Page) {
        this.page = page
        this.title = this.page.locator('h6', {hasText: 'Getting Started with OrangeHRM'})
    }

    async titleIsVisible() {
        await this.title.waitFor({state: 'visible'})
        return await this.title.isVisible()
    }
}
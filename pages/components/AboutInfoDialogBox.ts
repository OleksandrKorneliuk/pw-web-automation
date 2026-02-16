import { Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class AboutInfoDialogBox extends BasePage {

    readonly title: Locator

    constructor(page: Page) {
        super(page)
        this.title = this.page.locator('h6', {hasText: 'About'})
    }

    async titleIsVisible() {
        await this.title.waitFor({state: 'visible'})
        return await this.title.isVisible()
    }
}
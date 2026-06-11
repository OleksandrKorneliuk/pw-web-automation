import { Locator, Page } from "@playwright/test";
import { BaseComponent } from "./baseComponent";

export class AboutInfoDialogBox extends BaseComponent {

    readonly title: Locator

    constructor(page: Page) {
        super(page)
        this.title = this.root.getByRole('heading', {name: 'About'})
    }

    get root(): Locator {
        return this.page.getByRole('document')
    }

    async titleIsVisible() {
        await this.title.waitFor({state: 'visible'})
        return await this.title.isVisible()
    }
}
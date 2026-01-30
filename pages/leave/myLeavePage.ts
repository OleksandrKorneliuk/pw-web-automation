import {Locator, Page} from '@playwright/test'

export class MyLeavePage {

    readonly page: Page

    readonly title: Locator

    constructor(page: Page) {
        this.page = page

        this.title = this.page.getByRole('heading', { name: 'My Leave List' })
    }

    async titleIsVisible() {
        await this.title.waitFor({state: 'visible'})
        return await this.title.isVisible()
    }
}
import {Locator, Page} from '@playwright/test'

export class ApplyPage {

    readonly page: Page

    readonly title: Locator

    constructor(page: Page) {
        this.page = page

        this.title = this.page.getByRole('heading', { name: 'Apply Leave' })
    }

    async titleIsVisible() {
        await this.title.waitFor({state: 'visible'})
        return await this.title.isVisible()
    }
}
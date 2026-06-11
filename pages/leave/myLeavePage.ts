import {Locator, Page} from '@playwright/test'
import { BasePage } from '../basePage'

export class MyLeavePage extends BasePage {

    readonly title: Locator

    constructor(page: Page) {
        super(page)
        this.title = this.page.getByRole('heading', { name: 'My Leave List' })
    }

    get url(): string {
        return 'leave/viewMyLeaveList'
    }

    async titleIsVisible() {
        await this.title.waitFor({state: 'visible'})
        return await this.title.isVisible()
    }
}
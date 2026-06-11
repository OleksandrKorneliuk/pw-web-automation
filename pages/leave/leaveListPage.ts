import {Locator, Page} from '@playwright/test'
import { BasePage } from '../basePage'

export class LeaveListPage extends BasePage {

    readonly title: Locator

    constructor(page: Page) {
        super(page)
        this.title = this.page.getByRole('heading', { name: 'Leave List' })
    }

    get url(): string {
        return 'leave/viewLeaveList'
    }

    async titleIsVisible() {
        await this.title.waitFor({state: 'visible'})
        return await this.title.isVisible()
    }
}
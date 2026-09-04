import {Locator, Page} from '@playwright/test'
import { BasePage } from '../basePage'

export class LeaveListPage extends BasePage {

    readonly title: Locator = this.page.getByRole('heading', { name: 'Leave List' })

    constructor(page: Page) {
        super(page)
    }

    get url(): string {
        return 'leave/viewLeaveList'
    }
}
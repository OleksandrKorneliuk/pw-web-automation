import {Locator, Page} from '@playwright/test'
import { BasePage } from '../basePage'

export class MyLeavePage extends BasePage {

    readonly title: Locator = this.page.getByRole('heading', { name: 'My Leave List' })

    constructor(page: Page) {
        super(page)
    }

    get url(): string {
        return 'leave/viewMyLeaveList'
    }
}
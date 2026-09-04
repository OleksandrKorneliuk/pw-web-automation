import {Locator, Page} from '@playwright/test'
import { BasePage } from '../basePage'

export class ApplyLeavePage extends BasePage {

    readonly title: Locator = this.page.getByRole('heading', { name: 'Apply Leave' })

    constructor(page: Page) {
        super(page)
    }

    get url(): string {
        return 'leave/applyLeave'
    }
}
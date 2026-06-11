import {Locator, Page} from '@playwright/test'
import { BasePage } from '../basePage'

export class ApplyLeavePage extends BasePage {

    readonly title: Locator

    constructor(page: Page) {
        super(page)
        this.title = this.page.getByRole('heading', { name: 'Apply Leave' })
    }

    get url(): string {
        return 'leave/applyLeave'
    }

    async titleIsVisible() {
        await this.title.waitFor({state: 'visible'})
        return await this.title.isVisible()
    }
}
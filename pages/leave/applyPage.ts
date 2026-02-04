import {Locator, Page} from '@playwright/test'
import { BasePage } from '../BasePage'

export class ApplyPage extends BasePage {

    readonly title: Locator

    constructor(page: Page) {
        super(page)
        this.title = this.page.getByRole('heading', { name: 'Apply Leave' })
    }

    async titleIsVisible() {
        await this.title.waitFor({state: 'visible'})
        return await this.title.isVisible()
    }
}
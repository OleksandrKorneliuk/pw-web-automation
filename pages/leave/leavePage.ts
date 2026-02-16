import { Page, Locator } from '@playwright/test'
import { LeavePageTab } from '../../enums/pages/leave/LeavePageTab'
import { BasePage } from '../BasePage'

export class LeavePage extends BasePage {

    readonly navigationListItem: Locator

    constructor(page: Page) {
        super(page)
        this.navigationListItem = this.page.locator('header ul li')
    }

    async clickItem(listItem: LeavePageTab) {
        switch (listItem) {
            case LeavePageTab.APPLY:
                await this.navigationListItem.nth(1).click()
                break
            case LeavePageTab.MY_LEAVE:
                await this.navigationListItem.nth(2).click()
                break
            case LeavePageTab.ENTITLEMENTS:
                await this.navigationListItem.nth(3).click()
                break
            case LeavePageTab.REPORTS:
                await this.navigationListItem.nth(4).click()
                break
            case LeavePageTab.CONFIGURE:
                await this.navigationListItem.nth(5).click()
                break
            case LeavePageTab.LEAVE_LIST:
                await this.navigationListItem.nth(6).click()
                break
            case LeavePageTab.ASSIGN_LEAVE:
                await this.navigationListItem.nth(7).click()
                break
        }
    }
}
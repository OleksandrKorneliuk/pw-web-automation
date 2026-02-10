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
            case LeavePageTab.Apply:
                await this.navigationListItem.nth(1).click()
                break
            case LeavePageTab.MyLeave:
                await this.navigationListItem.nth(2).click()
                break
            case LeavePageTab.Entitlements:
                await this.navigationListItem.nth(3).click()
                break
            case LeavePageTab.Reports:
                await this.navigationListItem.nth(4).click()
                break
            case LeavePageTab.Configure:
                await this.navigationListItem.nth(5).click()
                break
            case LeavePageTab.LeaveList:
                await this.navigationListItem.nth(6).click()
                break
            case LeavePageTab.AssignLeave:
                await this.navigationListItem.nth(7).click()
                break
        }
    }
}
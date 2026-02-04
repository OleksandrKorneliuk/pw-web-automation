import { Page, Locator } from '@playwright/test'
import { LeavePageItem } from '../../enums/pages/LeavePageItem'
import { BasePage } from '../BasePage'

export class LeavePage extends BasePage {

    readonly navigationListItem: Locator

    constructor(page: Page) {
        super(page)
        this.navigationListItem = this.page.locator('header ul li')
    }

    async clickItem(listItem: LeavePageItem) {
        switch (listItem) {
            case LeavePageItem.Apply:
                await this.navigationListItem.nth(1).click()
                break
            case LeavePageItem.MyLeave:
                await this.navigationListItem.nth(2).click()
                break
            case LeavePageItem.Entitlements:
                await this.navigationListItem.nth(3).click()
                break
            case LeavePageItem.Reports:
                await this.navigationListItem.nth(4).click()
                break
            case LeavePageItem.Configure:
                await this.navigationListItem.nth(5).click()
                break
            case LeavePageItem.LeaveList:
                await this.navigationListItem.nth(6).click()
                break
            case LeavePageItem.AssignLeave:
                await this.navigationListItem.nth(7).click()
                break
        }
    }
}
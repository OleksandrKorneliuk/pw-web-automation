import { Page, Locator } from '@playwright/test'
import { BasePage } from '../BasePage'
import { AdminPageTab } from '../../enums/pages/admin/AdminPageTab'
import { OrganizationPageOption } from '../../enums/pages/admin/OrganizationTabOption'

export class AdminPage extends BasePage {

    readonly topbarMenu: Locator
    readonly tabsNavigationListOption: Locator

    constructor(page: Page) {
        super(page)
        this.topbarMenu = this.page.locator('header ul li')
        this.tabsNavigationListOption = this.topbarMenu.locator('ul li')
    }

    async clickOnTab(listItem: AdminPageTab) {
        switch (listItem) {
            case AdminPageTab.USER_MANAGEMENT:
                await this.topbarMenu.nth(1).click()
                break
            case AdminPageTab.JOB:
                await this.topbarMenu.nth(2).click()
                break
            case AdminPageTab.ORGANIZATION:
                await this.topbarMenu.nth(3).click()
                break
            case AdminPageTab.QUALIFICATIONS:
                await this.topbarMenu.nth(4).click()
                break
            case AdminPageTab.NATIONALITIES:
                await this.topbarMenu.nth(5).click()
                break
            case AdminPageTab.CORPORATE_BRANDING:
                await this.topbarMenu.nth(6).click()
                break
            case AdminPageTab.CONFIGURATION:
                await this.topbarMenu.nth(7).click()
                break
        }
    }

    async clickOnOrganizationTabOption(option: OrganizationPageOption) {
        await this.tabsNavigationListOption.getByRole('menuitem', {name: option}).click()
    }
}
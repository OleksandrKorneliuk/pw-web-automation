import { Page, Locator } from '@playwright/test'
import { BasePage } from '../BasePage'
import { AdminPageTab } from '../../enums/pages/admin/AdminPageTab'
import { OrganizationPageOption } from '../../enums/pages/admin/OrganizationTabOption'

export class AdminPage extends BasePage {

    readonly navigationListTab: Locator
    readonly tabsNavigationListOption: Locator

    constructor(page: Page) {
        super(page)
        this.navigationListTab = this.page.locator('header ul li')
        this.tabsNavigationListOption = this.navigationListTab.locator('ul li')
    }

    async clickOnTab(listItem: AdminPageTab) {
        switch (listItem) {
            case AdminPageTab.USER_MANAGEMENT:
                await this.navigationListTab.nth(1).click()
                break
            case AdminPageTab.JOB:
                await this.navigationListTab.nth(2).click()
                break
            case AdminPageTab.ORGANIZATION:
                await this.navigationListTab.nth(3).click()
                break
            case AdminPageTab.QUALIFICATIONS:
                await this.navigationListTab.nth(4).click()
                break
            case AdminPageTab.NATIONALITIES:
                await this.navigationListTab.nth(5).click()
                break
            case AdminPageTab.CORPORATE_BRANDING:
                await this.navigationListTab.nth(6).click()
                break
            case AdminPageTab.CONFIGURATION:
                await this.navigationListTab.nth(7).click()
                break
        }
    }

    async clickOnOrganizationTabOption(option: OrganizationPageOption) {
        switch (option) {
            case OrganizationPageOption.STRUCTURE:
                await this.tabsNavigationListOption.filter({ hasText: option }).click()
                break
        }
    }
}
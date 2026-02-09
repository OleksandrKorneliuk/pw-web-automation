import {Page, Locator} from '@playwright/test'
import { NavigationBarItem } from '../../enums/pages/NavigationBarItem'
import { BasePage } from '../BasePage'

export class NavigationBar extends BasePage {

    private allSections: Locator
    private searchBar: Locator

    constructor(page: Page) {
        super(page)
        this.allSections = this.page.locator('.oxd-navbar-nav ul li')
        this.searchBar = this.page.locator('[placeholder="Search"]')
    }

    public getAllSections() {
        return this.allSections
    }

    public async searchBySearchBar(sectionName: NavigationBarItem) {
        await this.searchBar.fill(sectionName)
    }

    public async clickOnSection(sectionName: NavigationBarItem) {
        await this.allSections.filter({hasText: sectionName}).waitFor({state: 'visible'})
        await this.allSections.filter({hasText: sectionName}).click()
    }
}
import {Page, Locator} from '@playwright/test'
import { NavigationBarItem } from '../../enums/pages/navigationBarItem'

export class NavigationBar {

    readonly page: Page

    private allSections: Locator

    constructor(page: Page) {
        this.page = page
        this.allSections = this.page.locator('.oxd-navbar-nav ul li')
    }

    public getAllSections() {
        return this.allSections
    }

    public async searchBySearchBar(sectionName: NavigationBarItem) {
        await this.page.locator('[placeholder="Search"]').fill(sectionName)
    }

    public async clickOnSection(sectionName: NavigationBarItem) {
        const targetSection = this.allSections.filter({hasText: sectionName})
        await targetSection.click()
    }
}
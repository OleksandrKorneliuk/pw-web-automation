import {Page, Locator} from '@playwright/test'

export class NavigationComponent {

    readonly page: Page

    private allSections: Locator

    constructor(page: Page) {
        this.page = page
        this.allSections = this.page.locator('.oxd-navbar-nav ul li')
    }

    public getAllSections() {
        return this.allSections
    }

    public async searchBySearchBar(sectionName: string) {
        await this.page.locator('[placeholder="Search"]').fill(sectionName)
    }

    public async clickOnSection(sectionName: string) {
        const targetSection = this.allSections.filter({hasText: sectionName})
        await targetSection.click()
    }
}
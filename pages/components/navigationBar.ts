import {Page, Locator} from '@playwright/test'
import { NavigationBarItem } from '../../enums/navigationBarItem'
import { BaseComponent } from "./baseComponent";

export class NavigationBar extends BaseComponent {

    private allSections: Locator
    private searchBar: Locator

    constructor(page: Page) {
        super(page)
        this.allSections = this.root.getByRole('link')
        this.searchBar = this.root.getByRole('textbox')
    }

    get root(): Locator {
        return this.page.getByLabel('Sidepanel', { exact: true })
    }

    public getAllSections() {
        return this.allSections
    }

    public async searchBySearchBar(sectionName: NavigationBarItem) {
        await this.searchBar.fill(sectionName)
    }

    public async clickOnSection(sectionName: NavigationBarItem) {
        await this.allSections.filter({hasText: sectionName}).waitFor({state: 'visible'})
        await this.allSections.filter({hasText: sectionName}).click({timeout: 10000})
    }
}
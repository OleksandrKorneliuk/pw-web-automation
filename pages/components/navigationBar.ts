import { Page, Locator } from '@playwright/test'
import { NavigationBarTab } from '../../enums/navigationBarItem'
import { BaseComponent } from "./baseComponent";

export class NavigationBar extends BaseComponent {

    readonly link: Locator = this.root.getByRole('link')
    readonly searchBar: Locator = this.root.getByRole('textbox')

    constructor(page: Page) {
        super(page)
    }

    get root(): Locator {
        return this.page.getByLabel('Sidepanel', { exact: true })
    }

    public getTab(tabName: NavigationBarTab) {
        return this.link.filter({ hasText: tabName })
    }

    public async searchBySearchBar(sectionName: NavigationBarTab) {
        await this.searchBar.fill(sectionName)
    }

    public async clickOnTab(tabName: NavigationBarTab) {
        await this.getTab(tabName).click()
    }
}
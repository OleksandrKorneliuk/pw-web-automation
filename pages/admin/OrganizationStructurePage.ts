import { Page, Locator } from '@playwright/test'
import { BasePage } from '../BasePage';

export class OrganizationStructurePage extends BasePage {

    readonly title: Locator
    readonly editStructureToggle: Locator
    readonly addButton: Locator
    readonly unitNameTextbox: Locator
    readonly saveButton: Locator
    readonly addSubUnitButton: Locator
    readonly expandSubUnitsButton: Locator
    readonly deleteUnitButton: Locator
    readonly confirmDeletionButton: Locator
    readonly successfullyDeletedWarning: Locator

    constructor(page: Page) {
        super(page)
        this.title = this.page.getByRole('banner')
        this.editStructureToggle = this.page.locator('.oxd-switch-input')
        this.addButton = this.page.getByRole('button', { name: ' Add' })
        this.unitNameTextbox = this.page.getByRole('textbox').nth(2)
        this.saveButton = this.page.getByRole('button', { name: 'Save' })
        this.addSubUnitButton = this.page.locator('.--last > .oxd-tree-node-content > .oxd-sheet > .org-action > button:nth-child(3)')
        this.expandSubUnitsButton = this.page.locator('.--parent.--last > .oxd-tree-node-toggle > .oxd-icon-button')
        this.deleteUnitButton = this.page.locator('.--parent.--last > .oxd-tree-node-content > .oxd-sheet > .org-action > button').first()
        this.confirmDeletionButton = this.page.getByRole('button', { name: ' Yes, Delete' })
        this.successfullyDeletedWarning = this.page.getByText('SuccessSuccessfully Deleted×')
    }

    async titleIsVisible(name: string) {
        await this.title.waitFor({ state: 'visible' })
        const titleText = this.title.getByText(name)
        return await titleText.isVisible()
    }

    async enableEditStructureMode() {
        if (!await this.addButton.isVisible()) {
            await this.editStructureToggle.click()
        }
    }

    async addNewOrganizationUnit(name: string) {
        await this.addButton.click()
        await this.unitNameTextbox.fill(name)
        await this.saveButton.click()
    }

    async addNewSubUnit(name: string) {
        await this.addSubUnitButton.click()
        await this.unitNameTextbox.fill(name)
        await this.saveButton.click()
    }

    async expandSubUnits() {
        await this.expandSubUnitsButton.click()
    }

    async isOrganizationUnitCreated(name: string) {
        const element = this.page.locator('#app').getByText(name, { exact: true })
        return (await element.count()) > 0
    }

    async deleteOrganizationUnit() {
        await this.deleteUnitButton.click()
        await this.confirmDeletionButton.click()
    }

    async successfullyDeletedWarningIsVisible() {
        await this.successfullyDeletedWarning.waitFor({state: 'visible'})
        return await this.successfullyDeletedWarning.isVisible()
    }
}
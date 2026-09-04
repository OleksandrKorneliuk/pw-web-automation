import { Page, Locator } from '@playwright/test'
import { BasePage } from '../basePage';
import { Subunit } from '../../models/subunit';

export class OrganizationStructurePage extends BasePage {

    readonly title: Locator = this.page.getByRole('banner')
    readonly editStructureToggle: Locator = this.page.locator('.oxd-switch-input')
    readonly addButton: Locator = this.page.getByRole('button', { name: ' Add' })
    readonly unitNameTextbox: Locator = this.page.getByRole('textbox').nth(2)
    readonly unitIdTextbox: Locator = this.page.getByRole('textbox').nth(1)
    readonly unitDescriptionTextbox: Locator = this.page.getByRole('textbox').nth(3)
    readonly structureCard: Locator = this.page.locator('.org-structure-card')
    readonly saveButton: Locator = this.page.getByRole('button', { name: 'Save' })
    readonly addSubUnitButton: Locator = this.page.locator('button:has(i.bi-plus)')
    readonly expandSubUnitsButton: Locator = this.page.locator('[class="oxd-icon-button"]')
    readonly deleteUnitButton: Locator = this.page.locator('.--parent.--last > .oxd-tree-node-content > .oxd-sheet > .org-action > button').first()
    readonly confirmDeletionButton: Locator = this.page.getByRole('button', { name: ' Yes, Delete' })
    readonly successfullyDeletedWarning: Locator = this.page.getByText('SuccessSuccessfully Deleted×')
    readonly parentListItem: Locator = this.page.locator('xpath=ancestor::li[1]')

    constructor(page: Page) {
        super(page)
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

    async addSubunitFor(unitName: string, subunit: Subunit) {
        const unitCard = this.structureCard.filter({
            has: this.page.getByText(unitName, { exact: true })
        });

        const targetListitem = unitCard.locator(this.parentListItem);

        const addButton = targetListitem.locator(this.addSubUnitButton);

        await addButton.click();
        await this.fillOrganizationUnitForm(subunit)
    }

    async fillOrganizationUnitForm(subunit: Subunit) {
        await this.unitIdTextbox.fill(subunit.unitId)
        await this.unitNameTextbox.fill(subunit.name)
        await this.unitDescriptionTextbox.fill(subunit.description)
        await this.saveButton.click()
    }

    async expandSubunitsFor(unitName: string) {
        const unitCard = this.structureCard.filter({
            has: this.page.getByText(unitName, { exact: true })
        });

        const targetListitem = unitCard.locator(this.parentListItem);
        const expandBtn = targetListitem.locator(this.expandSubUnitsButton)
        await expandBtn.click()
    }

    async isOrganizationUnitCreated(name: string) {
        const element = this.page.getByText(name, { exact: true })
        return await element.isVisible()
    }

    async deleteOrganizationUnit() {
        await this.deleteUnitButton.click()
        await this.confirmDeletionButton.click()
    }

    async successfullyDeletedWarningIsVisible() {
        await this.successfullyDeletedWarning.waitFor({ state: 'visible' })
        return await this.successfullyDeletedWarning.isVisible()
    }
}
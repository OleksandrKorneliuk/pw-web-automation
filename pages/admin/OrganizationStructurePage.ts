import { Page, Locator } from '@playwright/test'
import { BasePage } from '../basePage';
import { Subunit } from '../../models/subunit';

export class OrganizationStructurePage extends BasePage {

    readonly title: Locator
    readonly editStructureToggle: Locator
    readonly addButton: Locator
    readonly unitNameTextbox: Locator
    readonly unitIdTextbox: Locator
    readonly unitDescriptionTextbox: Locator
    readonly structureCard: Locator
    readonly saveButton: Locator
    readonly addSubUnitButton: Locator
    readonly expandSubUnitsButton: Locator
    readonly deleteUnitButton: Locator
    readonly confirmDeletionButton: Locator
    readonly successfullyDeletedWarning: Locator
    readonly parentListItem: Locator

    constructor(page: Page) {
        super(page)
        this.title = this.page.getByRole('banner')
        this.editStructureToggle = this.page.locator('.oxd-switch-input')
        this.addButton = this.page.getByRole('button', { name: ' Add' })
        this.unitIdTextbox = this.page.getByRole('textbox').nth(1)
        this.unitNameTextbox = this.page.getByRole('textbox').nth(2)
        this.unitDescriptionTextbox = this.page.getByRole('textbox').nth(3)
        this.structureCard = this.page.locator('.org-structure-card')
        this.saveButton = this.page.getByRole('button', { name: 'Save' })
        this.addSubUnitButton = this.page.locator('button:has(i.bi-plus)')
        this.expandSubUnitsButton = this.page.locator('[class="oxd-icon-button"]')
        this.deleteUnitButton = this.page.locator('.--parent.--last > .oxd-tree-node-content > .oxd-sheet > .org-action > button').first()
        this.confirmDeletionButton = this.page.getByRole('button', { name: ' Yes, Delete' })
        this.successfullyDeletedWarning = this.page.getByText('SuccessSuccessfully Deleted×')
        this.parentListItem = this.page.locator('xpath=ancestor::li[1]')
    }

    get url(): string {
        return 'admin/viewCompanyStructure'
    }

    get url(): string {
        return 'admin/viewCompanyStructure'
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
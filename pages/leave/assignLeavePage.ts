import {Locator, Page} from '@playwright/test'
import { BasePage } from '../BasePage'

export class AssignLeavePage extends BasePage {

    readonly title: Locator
    readonly employeeNameInput: Locator
    readonly employeeNameSuggestion: Locator
    readonly selectLeaveTypeDropdownMenuIcon: Locator
    readonly leaveTypeOption: Locator
    readonly fromDateInput: Locator
    readonly toDateInput: Locator

    constructor(page: Page) {
        super(page)
        this.title = this.page.getByRole('heading', { name: 'Assign Leave' })
        this.employeeNameInput = this.page.getByPlaceholder('Type for hints...')
        this.employeeNameSuggestion = this.page.getByRole('option')
        this.selectLeaveTypeDropdownMenuIcon = this.page.locator('form i').first()
        this.leaveTypeOption = this.page.getByRole('listbox').getByRole('option')
        this.fromDateInput = this.page.locator('input').getByPlaceholder('yyyy-dd-mm').first()
        this.toDateInput = this.page.locator('input').getByPlaceholder('yyyy-dd-mm').nth(1)
    }

    async titleIsVisible() {
        await this.title.waitFor({state: 'visible'})
        return await this.title.isVisible()
    }

    async enterEmployeeName(name: string) {
        await this.employeeNameInput.fill(name)
        await this.employeeNameSuggestion.filter({hasText: name}).waitFor({state: 'visible'})
        await this.employeeNameSuggestion.filter({hasText: name}).click()
    }
}
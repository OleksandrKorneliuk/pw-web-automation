import { Locator, Page } from '@playwright/test'
import { BasePage } from '../basePage'
import { LeaveTypeOptions } from '../../enums/pages/leave/leaveTypeOptions'
import { Calendar } from '../components/calendar'

export class AssignLeavePage extends BasePage {

    readonly title: Locator = this.page.getByRole('heading', { name: 'Assign Leave' })
    readonly employeeNameInput: Locator = this.page.getByPlaceholder('Type for hints...')
    readonly employeeNameSuggestion: Locator = this.page.getByRole('option')
    readonly selectLeaveTypeDropdownMenuIcon: Locator = this.page.locator('form i').first()
    readonly leaveTypeOption: Locator = this.page.getByRole('listbox').getByRole('option')
    readonly dateInput: Locator = this.page.getByPlaceholder('yyyy')
    readonly assignButton: Locator = this.page.locator('button', { hasText: 'Assign' })
    readonly confirmLeaveDialogBox: Locator = this.page.locator('html').getByRole('document')
    readonly confirmLeaveDialogBoxOkButton: Locator = this.confirmLeaveDialogBox.getByRole('button', { name: 'OK' })

    private calendar: Calendar = new Calendar(this.page)

    constructor(page: Page) {
        super(page)
    }

    get url(): string {
        return 'leave/assignLeave'
    }

    async enterEmployeeName(name: string) {
        await this.employeeNameInput.fill(name)
        await this.employeeNameSuggestion.filter({ hasText: name }).waitFor({ state: 'visible' })
        await this.employeeNameSuggestion.filter({ hasText: name }).click()
    }

    async choseLeaveOption(option: LeaveTypeOptions) {
        await this.selectLeaveTypeDropdownMenuIcon.click()
        await this.leaveTypeOption.filter({ hasText: option }).waitFor({ state: 'visible' })
        await this.leaveTypeOption.filter({ hasText: option }).click()
    }

    async selectFirstDayOfLeave(date: Date) {
        await this.dateInput.first().click()
        await this.calendar.selectDate(date)
    }

    async selectLastDayOfLeave(date: Date) {
        await this.dateInput.nth(1).click()
        await this.calendar.selectDate(date)
    }

    async clickAssignButton() {
        await this.assignButton.click()
    }

    async confirmLeaveAssignment() {
        await this.confirmLeaveDialogBoxOkButton.click()
    }
}
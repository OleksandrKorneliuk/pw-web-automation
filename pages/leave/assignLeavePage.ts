import { Locator, Page } from '@playwright/test'
import { BasePage } from '../basePage'
import { LeaveTypeOptions } from '../../enums/pages/leave/leaveTypeOptions'
import { Calendar } from '../components/calendar'

export class AssignLeavePage extends BasePage {

    readonly title: Locator
    readonly employeeNameInput: Locator
    readonly employeeNameSuggestion: Locator
    readonly selectLeaveTypeDropdownMenuIcon: Locator
    readonly leaveTypeOption: Locator
    readonly dateInput: Locator
    readonly assignButton: Locator
    readonly confirmLeaveDialogBox: Locator
    readonly confirmLeaveDialogBoxOkButton: Locator

    private calendar: Calendar

    constructor(page: Page) {
        super(page)
        this.title = this.page.getByRole('heading', { name: 'Assign Leave' })
        this.employeeNameInput = this.page.getByPlaceholder('Type for hints...')
        this.employeeNameSuggestion = this.page.getByRole('option')
        this.selectLeaveTypeDropdownMenuIcon = this.page.locator('form i').first()
        this.leaveTypeOption = this.page.getByRole('listbox').getByRole('option')
        this.dateInput = this.page.getByPlaceholder('yyyy-dd-mm')
        this.assignButton = this.page.locator('button', { hasText: 'Assign' })
        this.confirmLeaveDialogBox = this.page.locator('html').getByRole('document')
        this.confirmLeaveDialogBoxOkButton = this.confirmLeaveDialogBox.getByRole('button', { name: 'OK' })

        this.calendar = new Calendar(page)
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
import {expect, Locator, Page} from '@playwright/test'
import { BasePage } from '../BasePage'
import { LeaveTypeOptions } from '../../enums/pages/leave/LeaveTypeOptions'
import { Calendar } from '../components/Calendar'

export class AssignLeavePage extends BasePage {

    readonly title: Locator
    readonly employeeNameInput: Locator
    readonly employeeNameSuggestion: Locator
    readonly selectLeaveTypeDropdownMenuIcon: Locator
    readonly leaveTypeOption: Locator
    readonly fromDateInput: Locator
    readonly toDateInput: Locator
    readonly calendar: Locator
    readonly assignButton: Locator
    readonly confirmLeaveAssignmentDialogBoxHeader: Locator
    readonly confirmLeaveAssignmentDialogBoxOkButton: Locator

    constructor(page: Page) {
        super(page)
        this.title = this.page.getByRole('heading', { name: 'Assign Leave' })
        this.employeeNameInput = this.page.getByPlaceholder('Type for hints...')
        this.employeeNameSuggestion = this.page.getByRole('option')
        this.selectLeaveTypeDropdownMenuIcon = this.page.locator('form i').first()
        this.leaveTypeOption = this.page.getByRole('listbox').getByRole('option')
        this.fromDateInput = this.page.getByPlaceholder('yyyy-dd-mm').first()
        this.toDateInput = this.page.getByPlaceholder('yyyy-dd-mm').nth(1)
        this.calendar = this.page.locator('.oxd-date-input-calendar')
        this.assignButton = this.page.locator('button', {hasText: 'Assign'})
        this.confirmLeaveAssignmentDialogBoxHeader = this.page.locator('.orangehrm-modal-header')
        this.confirmLeaveAssignmentDialogBoxOkButton = this.page.locator('button', {hasText: 'Ok'})
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

    async choseLeaveOption(option: LeaveTypeOptions) {
        await this.selectLeaveTypeDropdownMenuIcon.click()
        await this.leaveTypeOption.filter({hasText: option}).waitFor({state: 'visible'})
        await this.leaveTypeOption.filter({hasText: option}).click()
    }

    async selectFirstDayOfLeave(daysFromToday: number) {
        await this.fromDateInput.click()
        const fromDateCalendarRoot = this.calendar.filter({visible: true}).first()

        const calendar = new Calendar(fromDateCalendarRoot)
        await calendar.selectDate(daysFromToday)
    }

    async selectLastDayOfLeave(daysFromToday: number) {
        await this.toDateInput.click()
        const toDateCalendarRoot = this.calendar.filter({visible: true}).first()

        const calendar = new Calendar(toDateCalendarRoot)
        await calendar.selectDate(daysFromToday)
    }

    async clickAssignButton() {
        await this.assignButton.click()
    }

    async isDialogBoxHeaderContains(text: string) {
        await this.confirmLeaveAssignmentDialogBoxHeader.waitFor({state: 'visible'})
        expect(await this.confirmLeaveAssignmentDialogBoxHeader.textContent()).toContain(text)
    }

    async confirmLeaveAssignment() {
        await this.confirmLeaveAssignmentDialogBoxOkButton.waitFor({state: 'visible'})
        await this.confirmLeaveAssignmentDialogBoxOkButton.click()
    }

}
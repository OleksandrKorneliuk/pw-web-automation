import {Locator, Page} from '@playwright/test'
import { BasePage } from '../BasePage'
import { LeaveTypeOptions } from '../../enums/pages/LeaveTypeOptions'
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
        // this.monthSelector = this.calendar.locator('li.oxd-calendar-selector-month')
        // this.yearSelector = this.calendar.locator('li.oxd-calendar-selector-year')

        // this.calendarMonthText = this.monthSelector.locator('p')
        // this.calendarYearText = this.yearSelector.locator('p')
        // this.selectMonthDropdownMenuIcon = this.monthSelector.locator('i')
        // this.selectYearDropdownMenuIcon = this.yearSelector.locator('i')
        // this.selectMonthDropdownMenu = this.monthSelector.getByRole('menu')
        // this.selectYearDropdownMenu = this.yearSelector.getByRole('menu')
        // this.monthDropdownMenuItem = this.selectMonthDropdownMenu.locator('li')
        // this.yearDropdownMenuItem = this.selectYearDropdownMenu.locator('li')
        // this.calendarDates = this.calendar.locator('.oxd-calendar-dates-grid')
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

    // private async selectDateInCalendar(numberOfDaysFromToday: number) {
    //     let date = new Date();
    //     date.setDate(date.getDate() + numberOfDaysFromToday)
    //     const expectedDate = date.getDate().toString()
    //     const expectedMonth = date.toLocaleString('En-Us', {month: 'long'})
    //     const expectedYear = date.getFullYear().toString()

    //     let currentCalendarMonth = await this.calendarMonthText.textContent()
    //     while(currentCalendarMonth !== expectedMonth) {
    //         await this.selectMonthDropdownMenuIcon.click()
    //         await this.selectMonthDropdownMenu.waitFor({state: 'visible'})
    //         const targetMonth = this.monthDropdownMenuItem.filter({hasText: expectedMonth})
    //         await targetMonth.scrollIntoViewIfNeeded()
    //         await targetMonth.click()
    //     }

    //     let currentCalendarYear = await this.calendarYearText.textContent()
    //     while(currentCalendarYear !== expectedYear) {
    //         await this.selectYearDropdownMenuIcon.click()
    //         await this.selectYearDropdownMenu.waitFor({state: 'visible'})
    //         const targetYear = this.yearDropdownMenuItem.filter({hasText: expectedYear})
    //         await targetYear.scrollIntoViewIfNeeded()
    //         await targetYear.click()
    //     }

    //     await this.calendarDates.getByText(expectedDate, {exact: true}).click()
    // }
}
import { Locator, Page } from '@playwright/test'
import { BaseComponent } from "./baseComponent";

export class Calendar extends BaseComponent {

    readonly monthSelector: Locator
    readonly yearSelector: Locator
    readonly monthText: Locator
    readonly yearText: Locator
    readonly monthDropdownIcon: Locator
    readonly yearDropdownIcon: Locator
    readonly monthMenuItems: Locator
    readonly yearMenuItems: Locator
    readonly datesGrid: Locator

    constructor(page: Page) {
        super(page)

        this.monthSelector = this.root.locator("li[class*='selector-month']")
        this.yearSelector = this.root.locator("li[class*='selector-year']")

        this.monthText = this.monthSelector.locator('p')
        this.yearText = this.yearSelector.locator('p')

        this.monthDropdownIcon = this.monthSelector.locator('i')
        this.yearDropdownIcon = this.yearSelector.locator('i')

        this.monthMenuItems = this.monthSelector.getByRole('menu').locator('li')
        this.yearMenuItems = this.yearSelector.getByRole('menu').locator('li')

        this.datesGrid = this.root.locator('.oxd-calendar-dates-grid')
    }

    get root(): Locator {
        return this.page.locator('.oxd-date-input-calendar').first()
    }

    async selectDate(date: Date) {
        const { day, month, year } = this.getTargetDate(date)

        await this.selectMonth(month)
        await this.selectYear(year)
        await this.selectDay(day)
    }

    private getTargetDate(date: Date) {
        return {
            day: date.getDate().toString(),
            month: date.toLocaleString('en-US', { month: 'long' }),
            year: date.getFullYear().toString(),
        }
    }

    private async selectMonth(expectedMonth: string) {
        let currentCalendarMonth = await this.monthText.textContent()
        while (currentCalendarMonth !== expectedMonth) {
            await this.monthDropdownIcon.click()
            await this.monthMenuItems
                .filter({ hasText: expectedMonth })
                .click()

            currentCalendarMonth = await this.monthText.textContent()
        }
    }

    private async selectYear(expectedYear: string) {
        let currentCalendarYear = await this.yearText.textContent()
        while (currentCalendarYear !== expectedYear) {
            await this.yearDropdownIcon.click()
            await this.yearMenuItems
                .filter({ hasText: expectedYear })
                .click()

            currentCalendarYear = await this.yearText.textContent()
        }
    }

    private async selectDay(expectedDay: string) {
        await this.datesGrid
            .getByText(expectedDay, { exact: true })
            .click()
    }
}

import { Locator, Page } from '@playwright/test'
import { BaseComponent } from "./baseComponent";

export class Calendar extends BaseComponent {

    readonly monthSelector: Locator = this.root.locator("li[class*='selector-month']")
    readonly yearSelector: Locator = this.root.locator("li[class*='selector-year']")
    readonly monthText: Locator = this.monthSelector.locator('p')
    readonly yearText: Locator = this.yearSelector.locator('p')
    readonly monthDropdownIcon: Locator = this.monthSelector.locator('i')
    readonly yearDropdownIcon: Locator = this.yearSelector.locator('i')
    readonly monthMenuItems: Locator = this.monthSelector.getByRole('menu').locator('li')
    readonly yearMenuItems: Locator = this.yearSelector.getByRole('menu').locator('li')
    readonly datesGrid: Locator = this.root.locator('.oxd-calendar-dates-grid')

    constructor(page: Page) {
        super(page)
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

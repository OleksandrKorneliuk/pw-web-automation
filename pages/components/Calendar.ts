import { Locator, Page } from '@playwright/test'
import { BaseComponent } from "./baseComponent";

export class Calendar extends BaseComponent{

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
        this.monthSelector = this.root.locator('.oxd-calendar-selector-month')
        this.yearSelector = this.root.locator('.oxd-calendar-selector-year')

        this.monthText = this.monthSelector.locator('p')
        this.yearText = this.yearSelector.locator('p')

        this.monthDropdownIcon = this.monthSelector.locator('i')
        this.yearDropdownIcon = this.yearSelector.locator('i')

        this.monthMenuItems = this.monthSelector.getByRole('menu').locator('li')
        this.yearMenuItems = this.yearSelector.getByRole('menu').locator('li')

        this.datesGrid = this.root.locator('.oxd-calendar-dates-grid')
    }

    get root(): Locator {
        return this.page.locator('.oxd-date-input-calendar')
    }

    async selectDate(daysFromToday: number) {
        const date = new Date()
        date.setDate(date.getDate() + daysFromToday)

        const expectedDay = date.getDate().toString()
        const expectedMonth = date.toLocaleString('en-US', { month: 'long' })
        const expectedYear = date.getFullYear().toString()

        let currentCalendarMonth = await this.monthText.textContent()
        while (currentCalendarMonth !== expectedMonth) {
            await this.monthDropdownIcon.click()
            await this.monthMenuItems
                .filter({ hasText: expectedMonth })
                .first()
                .click()
        }

        let currentCalendarYear = await this.yearText.textContent()
        while (currentCalendarYear !== expectedYear) {
            await this.yearDropdownIcon.click()
            await this.yearMenuItems
                .filter({ hasText: expectedYear })
                .first()
                .click()
        }

        await this.datesGrid
            .getByText(expectedDay, { exact: true })
            .click()
    }
}

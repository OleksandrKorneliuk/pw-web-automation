import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../../basePage";

export class JobTitlesPage extends BasePage {

    readonly pageHeader: Locator = this.page.getByRole('heading', { name: 'Job Titles' });
    readonly addButton: Locator = this.page.getByRole('button', { name: /add/i });
    readonly jobTitlesTable: Locator = this.page.getByRole('table');
    readonly recordsSummary: Locator = this.page.getByText(/\(\d+\) Records Found|No Records Found/i);
    readonly jobTitlesColumnHeader: Locator = this.page.getByRole('columnheader', { name: 'Job Titles' });
    readonly jobDescriptionColumnHeader: Locator = this.page.getByRole('columnheader', { name: 'Job Description' });
    readonly actionsColumnHeader: Locator = this.page.getByRole('columnheader', { name: 'Actions' });
    readonly rows: Locator = this.page.getByRole('rowgroup').getByRole('row');
    readonly confirmDeletionButton: Locator = this.page.getByRole('button', { name: /yes, delete/i });
    readonly successfullyDeletedWarning: Locator = this.page.getByText(/successfully deleted/i);

    constructor(page: Page) {
        super(page);
    }

    get url(): string {
        return 'admin/viewJobTitleList';
    }

    async deleteJobTitleByTitleName(title: string) {
        const row = this.rows.filter({ hasText: title }).first();
        await expect(row).toBeVisible();
        await row.locator('button').first().click();
        await this.confirmDeletionButton.click();
    }
}
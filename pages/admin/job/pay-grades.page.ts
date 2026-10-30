import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../../basePage';

export class PayGradesPage extends BasePage {

    readonly pageHeader: Locator = this.page.getByRole('heading', { name: 'Pay Grades' });
    readonly addButton: Locator = this.page.getByRole('button', { name: /add/i });
    readonly nameColumnHeader: Locator = this.page.getByRole('columnheader', { name: 'Name' });
    readonly currencyColumnHeader: Locator = this.page.getByRole('columnheader', { name: 'Currency' });
    readonly actionsColumnHeader: Locator = this.page.getByRole('columnheader', { name: 'Actions' });
    readonly recordsSummary: Locator = this.page.getByText(/\(\d+\) Records Found|No Records Found/i);
    readonly dataRows: Locator = this.page.locator('[role="rowgroup"]').nth(1).getByRole('row');

    constructor(page: Page) {
        super(page);
    }

    get url(): string {
        return 'admin/viewPayGrades';
    }

}
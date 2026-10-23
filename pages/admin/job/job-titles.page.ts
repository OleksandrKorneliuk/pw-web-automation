import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../basePage";

export class JobTitlesPage extends BasePage {

    readonly pageHeader: Locator = this.page.getByRole('heading', { name: 'Job Titles' });
    readonly addButton: Locator = this.page.getByRole('button', { name: /add/i });
    readonly jobTitlesTable: Locator = this.page.getByRole('table');
    readonly recordsSummary: Locator = this.page.getByText(/\(\d+\) Records Found|No Records Found/i);
    readonly jobTitlesColumnHeader: Locator = this.page.getByRole('columnheader', { name: 'Job Titles' });
    readonly jobDescriptionColumnHeader: Locator = this.page.getByRole('columnheader', { name: 'Job Description' });
    readonly actionsColumnHeader: Locator = this.page.getByRole('columnheader', { name: 'Actions' });

    constructor(page: Page) {
        super(page);
    }

    get url(): string {
        return 'admin/viewJobTitleList';
    }


}
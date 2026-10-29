import { Locator, Page } from "@playwright/test";
import { BasePage } from "../../basePage";

export class AddJobTitlePage extends BasePage {

    readonly form: Locator = this.page.locator('form');
    readonly jobTitleLabel: Locator = this.page.locator('label', { hasText: 'Job Title' });
    readonly jobTitleInput: Locator = this.jobTitleLabel.locator('../..').locator('input');
    readonly jobDescriptionTextarea: Locator = this.page.getByPlaceholder('Type description here', { exact: true});
    readonly saveButton: Locator = this.page.getByRole('button', { name: 'Save' });
    readonly requiredFieldErrorMessage: Locator = this.page.getByText(/Required|required/i).first();

    constructor(page: Page) {
        super(page);
    }

    get url(): string {
        return 'admin/saveJobTitle';
    }


}
import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../basePage';

export class AddPayGradePage extends BasePage {

    readonly payGradeNameInput: Locator = this.page.locator('form').getByRole('textbox');
    readonly saveButton: Locator = this.page.getByRole('button', { name: 'Save' });

    constructor(page: Page) {
        super(page);
    }

    get url(): string {
        return 'admin/payGrade';
    }
}
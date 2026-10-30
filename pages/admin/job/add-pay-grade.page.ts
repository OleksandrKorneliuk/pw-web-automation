import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../basePage';

export class AddPayGradePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    get url(): string {
        return 'admin/payGrade';
    }

}
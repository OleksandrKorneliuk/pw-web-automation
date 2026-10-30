import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../../basePage';

export class PayGradesPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    get url(): string {
        return 'admin/viewPayGrades';
    }

}
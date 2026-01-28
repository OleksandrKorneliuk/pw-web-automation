import {Page} from '@playwright/test';
import { AddSystenUserPage } from './addSystemUserPage';

export class UserManagementPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async clickAddButton() {
        await this.page.getByRole('button').filter({ hasText: ' Add ' }).click()
        return new AddSystenUserPage(this.page)
    }
    
}
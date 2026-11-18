import { Locator, Page } from '@playwright/test';
import { BasePage } from '../basePage';

export class AddSystenUserPage extends BasePage {

    readonly successMessage: Locator = this.page.getByText('Successfully Saved');
    readonly userRoleDropdown: Locator = this.page.locator('form i').first();
    readonly adminRoleOption: Locator = this.page.getByRole('option', { name: 'Admin' }).locator('span');
    readonly employeeNameField: Locator = this.page.getByRole('textbox', { name: 'Type for hints...' });
    readonly statusDropdown: Locator = this.page.locator('form i').nth(1);
    readonly enabledOption: Locator = this.page.getByText('Enabled');
    readonly usernameField: Locator = this.page.getByRole('textbox').nth(2);
    readonly passwordTextbox: Locator = this.page.getByRole('textbox').nth(3);
    readonly confirmPasswordTextbox: Locator = this.page.getByRole('textbox').nth(4);
    readonly saveButton: Locator = this.page.getByRole('button', { name: 'Save' });
    readonly requiredFieldErrorMessage: Locator = this.page.getByText(/Required|required/i).first();

    constructor(page: Page) {
        super(page);
    }

    get url(): string {
        return 'admin/saveSystemUser';
    }

    async addUserAsAdmin(fullName: string) {
        await this.userRoleDropdown.click();
        await this.adminRoleOption.click();
        await this.employeeNameField.fill(fullName);
        await this.page.getByRole('option', { name: fullName, exact: true }).click();
        await this.statusDropdown.click();
        await this.enabledOption.click();
        await this.usernameField.fill(fullName);
        await this.passwordTextbox.fill('admin123');
        await this.confirmPasswordTextbox.fill('admin123');
        await this.saveButton.click();
    }
}
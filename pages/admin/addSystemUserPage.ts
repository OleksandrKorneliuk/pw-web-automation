import {Locator, Page} from '@playwright/test';
import { BasePage } from '../basePage';

export class AddSystenUserPage extends BasePage {

    readonly successMessage: Locator = this.page.getByText('Successfully Saved');
    readonly selectUserRoleDropdownMenuIcon: Locator = this.page.locator('form i').first()
    readonly adminRoleOption: Locator = this.page.getByRole('option', { name: 'Admin' }).locator('span')
    readonly employeeNameTextBox: Locator = this.page.getByRole('textbox', { name: 'Type for hints...' })
    readonly selectUserStatusDropdownMenuIcon: Locator = this.page.locator('form i').nth(1)
    readonly enabledOption: Locator = this.page.getByText('Enabled')
    readonly usernameTextbox: Locator = this.page.getByRole('textbox').nth(2)
    readonly passwordTextbox: Locator = this.page.getByRole('textbox').nth(3)
    readonly confirmPasswordTextbox: Locator = this.page.getByRole('textbox').nth(4)
    readonly saveButton: Locator = this.page.getByRole('button', { name: 'Save' })

    constructor(page: Page) {
        super(page)
    }

    get url(): string {
        return 'admin/saveSystemUser'
    }

    async addUserAsAdmin(fullName: string) {
        await this.selectUserRoleDropdownMenuIcon.click()
        await this.adminRoleOption.click()
        await this.employeeNameTextBox.fill(fullName)
        await this.page.getByRole('option', { name: fullName }).click()
        await this.selectUserStatusDropdownMenuIcon.click()
        await this.enabledOption.click()
        await this.usernameTextbox.fill(fullName)
        await this.passwordTextbox.fill('admin123')
        await this.confirmPasswordTextbox.fill('admin123')
        await this.saveButton.click()
    }

    async successMessageIsVisible() {
        await this.successMessage.waitFor({state: 'visible'})
        return await this.successMessage.isVisible()
    }
}
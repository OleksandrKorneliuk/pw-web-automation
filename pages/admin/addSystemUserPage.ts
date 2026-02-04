import {Locator, Page} from '@playwright/test';
import { BasePage } from '../BasePage';

export class AddSystenUserPage extends BasePage {

    readonly successMessage: Locator
    readonly selectUserRoleDropdownMenuIcon: Locator
    readonly adminRoleOption: Locator
    readonly employeeNameTextBox: Locator
    readonly employeeNameSuggestion: Locator
    readonly selectUserStatusDropdownMenuIcon: Locator
    readonly enabledOption: Locator
    readonly usernameTextbox: Locator
    readonly passwordTextbox: Locator
    readonly confirmPasswordTextbox: Locator
    readonly saveButton: Locator

    constructor(page: Page) {
        super(page)
        this.successMessage = this.page.getByText('Successfully Saved')
        this.selectUserRoleDropdownMenuIcon = this.page.locator('form i').first()
        this.adminRoleOption = this.page.getByRole('option', { name: 'Admin' }).locator('span')
        this.employeeNameTextBox = this.page.getByRole('textbox', { name: 'Type for hints...' })
        this.employeeNameSuggestion = this.page.getByRole('option').first()
        this.selectUserStatusDropdownMenuIcon = this.page.locator('form i').nth(1)
        this.enabledOption = this.page.getByText('Enabled')
        this.usernameTextbox = this.page.getByRole('textbox').nth(2)
        this.passwordTextbox = this.page.getByRole('textbox').nth(3)
        this.confirmPasswordTextbox = this.page.getByRole('textbox').nth(4)
        this.saveButton = this.page.getByRole('button', { name: 'Save' })
    }

    async addUserAsAdmin(fullName: string) {
        await this.selectUserRoleDropdownMenuIcon.click()
        await this.adminRoleOption.click()
        await this.employeeNameTextBox.fill(fullName)
        await this.page.waitForTimeout(5000)
        await this.employeeNameSuggestion.click()
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
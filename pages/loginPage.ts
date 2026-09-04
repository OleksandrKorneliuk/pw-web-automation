import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {

    readonly usernameInput: Locator = this.page.getByRole('textbox', { name: 'Username' })
    readonly passwordInput: Locator = this.page.getByRole('textbox', { name: 'Password' })
    readonly submitButton: Locator = this.page.getByRole('button', { name: 'Login' })
    readonly errorMessage: Locator = this.page.getByRole('alert')
    readonly title: Locator = this.page.getByRole('heading')

    constructor(page: Page) {
        super(page)
    }

    get url(): string {
        return 'auth/login'
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async getErrorMessageTextContent() {
        return await this.errorMessage.textContent()
    }
}
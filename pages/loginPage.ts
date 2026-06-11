import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {

    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator
    readonly title: Locator

    constructor(page: Page) {
        super(page)
        this.usernameInput = this.page.getByRole('textbox', { name: 'Username' })
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' })
        this.submitButton = this.page.getByRole('button', { name: 'Login' })
        this.errorMessage = this.page.getByRole('alert')
        this.title = this.page.getByRole('heading')
    }

    get url(): string {
        return 'auth/login'
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async errorMessageIsVisible() {
        await this.errorMessage.waitFor({ state: 'visible' })
        return await this.errorMessage.isVisible()
    }

    async getErrorMessageTextContent() {
        return await this.errorMessage.textContent()
    }

    async titleIsVisible() {
        await this.title.waitFor({ state: 'visible' })
        return await this.title.isVisible()
    }
}
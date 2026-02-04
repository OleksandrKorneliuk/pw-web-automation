import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator
    readonly title: Locator

    constructor(page: Page) {
        super(page)
        this.usernameInput = this.page.locator('input[name="username"]')
        this.passwordInput = this.page.locator('input[name="password"]')
        this.submitButton = this.page.locator('button[type="submit"]')
        this.errorMessage = this.page.getByRole('alert');
        this.title = this.page.locator('h5', {hasText: 'Login'})
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
        await this.title.waitFor({state: 'visible'})
        return await this.title.isVisible()
    }
}
import { test as base } from '@playwright/test'
import { LoginPage } from './pages/LoginPage';

export type TestOptions = {
    formLoginPage: void
}

export const test = base.extend<TestOptions>({
    formLoginPage: [async ({ page }, use) => {
        await page.goto('/')
        let loginPage = new LoginPage(page)
        await loginPage.login('Admin', 'admin123')
        await use()
    }, { auto: true }]
})
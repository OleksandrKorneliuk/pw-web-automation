import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';
import { NavigationBar } from '../pages/components/navigationBar';

export type TestOptions = {
    formLoginPage: void
    navigationBar: NavigationBar
}

export const test = base.extend<TestOptions>({
    formLoginPage: [async ({ page }, use) => {
        await page.goto('/')
        let loginPage = new LoginPage(page)
        await loginPage.login('Admin', 'admin123')
        await use()
    }, { auto: true }]
})
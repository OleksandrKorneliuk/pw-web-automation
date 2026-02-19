import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';

test.describe.parallel('Login Page Tests', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('/');
    });

    test('should login with valid credentials', async ({ page }) => {
        await loginPage.login('Admin', 'admin123');
        await expect(page).toHaveURL(/\/dashboard\/index$/);
    });

    test('should show error with invalid username', async ({}) => {
        await loginPage.login('invalidUser', 'admin123')

        expect(await loginPage.errorMessageIsVisible()).toBeTruthy()
        expect(await loginPage.getErrorMessageTextContent()).toContain('Invalid credentials')
    })

    test('should show error with invalid password', async ({}) => {
        await loginPage.login('Admin', 'invalidPassword');

        expect(await loginPage.errorMessageIsVisible()).toBeTruthy()
        expect(await loginPage.getErrorMessageTextContent()).toContain('Invalid credentials')
    })

    test('should show error with invalid username and password', async ({}) => {
        await loginPage.login('invalidUser', 'invalidPassword');

        expect(await loginPage.errorMessageIsVisible()).toBeTruthy()
        expect(await loginPage.getErrorMessageTextContent()).toContain('Invalid credentials')
    })
})
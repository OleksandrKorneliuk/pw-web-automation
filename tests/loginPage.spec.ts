import { test } from '../fixtures/PageManager'
import { expect } from '@playwright/test'

test.describe.parallel('Login Page Tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto()
    });

    test('should login with valid credentials', async ({ page, loginPage }) => {
        await loginPage.login('Admin', 'admin123');
        await expect(page).toHaveURL(/\/dashboard\/index$/);
    });

    test('should show error with invalid username', async ({ loginPage }) => {
        await loginPage.login('invalidUser', 'admin123')

        await expect(loginPage.errorMessage).toBeVisible()
        expect(await loginPage.getErrorMessageTextContent()).toContain('Invalid credentials')
    })

    test('should show error with invalid password', async ({ loginPage }) => {
        await loginPage.login('Admin', 'invalidPassword');

        await expect(loginPage.errorMessage).toBeVisible()
        expect(await loginPage.getErrorMessageTextContent()).toContain('Invalid credentials')
    })

    test('should show error with invalid username and password', async ({ loginPage }) => {
        await loginPage.login('invalidUser', 'invalidPassword');

        await expect(loginPage.errorMessage).toBeVisible()
        expect(await loginPage.getErrorMessageTextContent()).toContain('Invalid credentials')
    })
})
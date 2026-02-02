import {test, expect} from '@playwright/test'
import {LoginPage} from '../pages/loginPage';

test.describe('Login Page Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await page.goto('/');
    });

    test('should login with valid credentials', async ({page}) => {
        await loginPage.login('Admin', 'admin123');
        await expect(page).toHaveURL(/\/dashboard\/index$/);
    });

    test('should show error with invalid credentials', async ({page}) => {
        await loginPage.login('invalidUser', 'invalidPassword');

        expect(await loginPage.errorMessageIsVisible()).toBeTruthy()
        expect(await loginPage.getErrorMessageTextContent()).toContain('Invalid credentials');
    });
});
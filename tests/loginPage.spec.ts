import {test, expect} from '@playwright/test'
import {LoginPage} from '../pages/loginPage';

test.describe('Login Page Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    test('should login with valid credentials', async ({page}) => {
        await loginPage.login('Admin', 'admin123');
        await expect(page).toHaveURL(/\/dashboard\/index$/);
    });

    test('should show error with invalid credentials', async ({page}) => {
        await loginPage.login('invalidUser', 'invalidPassword');
        const errorMessage = page.getByRole('alert');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Invalid credentials');
    });
});
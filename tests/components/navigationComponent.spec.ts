import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { NavigationComponent } from '../../pages/components/navigationComponent';

test.describe('Navigation page functional tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        let loginPage = new LoginPage(page)
        await loginPage.login('Admin', 'admin123');
    });

    test('navigate through each section', async ({ page }) => {
        const navigationPage = new NavigationComponent(page)

        const expectedSectionTitles = [
            'Admin', 'PIM', 'Leave', 'Time', 'Recruitment',
            'My Info', 'Performance', 'Dashboard',
            'Directory', 'Maintenance', 'Claim', 'Buzz'
        ]

        const sections = navigationPage.getAllSections()

        await expect(sections).toHaveCount(expectedSectionTitles.length)

        for (let i = 0; i < expectedSectionTitles.length; ++i) {
            await expect(sections.nth(i)).toContainText(expectedSectionTitles[i])
        }
    })

    test('search by search bar', async ({ page }) => {
        const navigationPage = new NavigationComponent(page)

        const expectedSectionTitles = [
            'Admin', 'PIM', 'Leave', 'Time', 'Recruitment',
            'My Info', 'Performance', 'Dashboard',
            'Directory', 'Maintenance', 'Claim', 'Buzz'
        ]

        for (let i = 0; i < expectedSectionTitles.length; ++i) {
            const currentExpectedSectionTitle = expectedSectionTitles[i]
            navigationPage.searchBySearchBar(currentExpectedSectionTitle)
            const foundedSections = navigationPage.getAllSections()
            await expect(foundedSections.first()).toContainText(currentExpectedSectionTitle)
        }
    })

    test('inspect root elements of the sections', async ({ page }) => {
        const navigationPage = new NavigationComponent(page)

        const expectedSectionTitles = [
            'Admin', 'PIM', 'Leave', 'Time', 'Recruitment',
            'My Info', 'Performance', 'Dashboard',
            'Directory', 'Claim', 'Buzz'
        ]

        for (let i = 0; i < expectedSectionTitles.length; ++i) {
            const currentExpectedSectionTitle = expectedSectionTitles[i]
            await navigationPage.clickOnSection(currentExpectedSectionTitle)

            await expect(page.locator('.oxd-topbar-header-breadcrumb-module')).toContainText(currentExpectedSectionTitle)
            await expect(page).toHaveURL(
                new RegExp(currentExpectedSectionTitle.toLowerCase())
            )
        }
    })
});
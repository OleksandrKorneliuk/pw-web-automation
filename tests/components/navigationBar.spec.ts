import { expect } from '@playwright/test';
import { test } from '../../fixtures/PageManager';
import { NavigationBarTab } from '../../enums/navigationBarItem';

test.describe('Navigation page functional tests', () => {

    const expectedSectionTitles = [
        NavigationBarTab.ADMIN, NavigationBarTab.PIM, NavigationBarTab.LEAVE, NavigationBarTab.TIME, NavigationBarTab.RECRUITMENT,
        NavigationBarTab.MY_INFO, NavigationBarTab.PERFOMANCE, NavigationBarTab.DASHBOARD,
        /*NavigationBarItem.DIRECTORY,*/ NavigationBarTab.MAINTENANCE, NavigationBarTab.CLAIM, NavigationBarTab.BUZZ
    ]

    test('navigate through each section', async ({ userManagementPage, navigationBar }) => {
        await userManagementPage.goto()

        for (let i = 0; i < expectedSectionTitles.length; ++i) {
            await expect(navigationBar.getTab(expectedSectionTitles[0])).toBeVisible()
        }
    })

    test('search by search bar', async ({ userManagementPage, navigationBar }) => {
        await userManagementPage.goto()

        for (let i = 0; i < expectedSectionTitles.length; ++i) {
            const currentExpectedSectionTitle = expectedSectionTitles[i]
            navigationBar.searchBySearchBar(currentExpectedSectionTitle)
            const actualTab = navigationBar.getTab(expectedSectionTitles[i])
            await expect(actualTab).toContainText(currentExpectedSectionTitle)
        }
    })

    test('inspect root elements of the sections', async ({ page, userManagementPage, navigationBar }) => {
        await userManagementPage.goto()

        for (let i = 0; i < expectedSectionTitles.length; ++i) {
            let currentExpectedSectionTitle = expectedSectionTitles[i]

            if (currentExpectedSectionTitle == NavigationBarTab.MY_INFO ||
                currentExpectedSectionTitle == NavigationBarTab.MAINTENANCE
            ) {
                currentExpectedSectionTitle = expectedSectionTitles[++i]
            }

            await navigationBar.clickOnTab(currentExpectedSectionTitle)

            await expect(page.locator('.oxd-topbar-header-breadcrumb-module')).toContainText(currentExpectedSectionTitle)
            await expect(page).toHaveURL(
                new RegExp(currentExpectedSectionTitle.toLowerCase())
            )
        }
    })
});
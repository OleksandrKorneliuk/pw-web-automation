import { expect } from '@playwright/test';
import { test } from '../../fixtures/PageManager';
import { NavigationBarItem } from '../../enums/navigationBarItem';

test.describe('Navigation page functional tests', () => {

    const expectedSectionTitles = [
        NavigationBarItem.ADMIN, NavigationBarItem.PIM, NavigationBarItem.LEAVE, NavigationBarItem.TIME, NavigationBarItem.RECRUITMENT,
        NavigationBarItem.MY_INFO, NavigationBarItem.PERFOMANCE, NavigationBarItem.DASHBOARD,
        NavigationBarItem.DIRECTORY, NavigationBarItem.MAINTENANCE, NavigationBarItem.CLAIM, NavigationBarItem.BUZZ
    ]

    test('navigate through each section', async ({ navigationBar }) => {
        const sections = navigationBar.getAllSections()

        await expect(sections).toHaveCount(expectedSectionTitles.length)

        for (let i = 0; i < expectedSectionTitles.length; ++i) {
            await expect(sections.nth(i)).toContainText(expectedSectionTitles[i])
        }
    })

    test('search by search bar', async ({ navigationBar }) => {
        for (let i = 0; i < expectedSectionTitles.length; ++i) {
            const currentExpectedSectionTitle = expectedSectionTitles[i]
            navigationBar.searchBySearchBar(currentExpectedSectionTitle)
            const foundedSections = navigationBar.getAllSections()
            await expect(foundedSections.first()).toContainText(currentExpectedSectionTitle)
        }
    })

    test('inspect root elements of the sections', async ({ page, navigationBar }) => {
        for (let i = 0; i < expectedSectionTitles.length; ++i) {
            let currentExpectedSectionTitle = expectedSectionTitles[i]

            if(currentExpectedSectionTitle == NavigationBarItem.MY_INFO ||
                currentExpectedSectionTitle == NavigationBarItem.MAINTENANCE
            ) {
                currentExpectedSectionTitle = expectedSectionTitles[++i]
            }

            await navigationBar.clickOnSection(currentExpectedSectionTitle)

            await expect(page.locator('.oxd-topbar-header-breadcrumb-module')).toContainText(currentExpectedSectionTitle)
            await expect(page).toHaveURL(
                new RegExp(currentExpectedSectionTitle.toLowerCase())
            )
        }
    })
});
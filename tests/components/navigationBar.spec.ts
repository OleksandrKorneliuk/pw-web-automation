import { expect } from '@playwright/test';
import { test } from '../../test-options';
import { NavigationBar } from '../../pages/components/navigationBar';
import { NavigationBarItem } from '../../enums/pages/NavigationBarItem';

test.describe('Navigation page functional tests', () => {

    const expectedSectionTitles = [
        NavigationBarItem.Admin, NavigationBarItem.PIM, NavigationBarItem.Leave, NavigationBarItem.Time, NavigationBarItem.Recruitment,
        NavigationBarItem.MyInfo, NavigationBarItem.Performance, NavigationBarItem.Dashboard,
        NavigationBarItem.Directory, NavigationBarItem.Maintenance, NavigationBarItem.Claim, NavigationBarItem.Buzz
    ]

    test('navigate through each section', async ({ page }) => {
        const navigationPage = new NavigationBar(page)
        const sections = navigationPage.getAllSections()

        await expect(sections).toHaveCount(expectedSectionTitles.length)

        for (let i = 0; i < expectedSectionTitles.length; ++i) {
            await expect(sections.nth(i)).toContainText(expectedSectionTitles[i])
        }
    })

    test('search by search bar', async ({ page }) => {
        const navigationPage = new NavigationBar(page)

        for (let i = 0; i < expectedSectionTitles.length; ++i) {
            const currentExpectedSectionTitle = expectedSectionTitles[i]
            navigationPage.searchBySearchBar(currentExpectedSectionTitle)
            const foundedSections = navigationPage.getAllSections()
            await expect(foundedSections.first()).toContainText(currentExpectedSectionTitle)
        }
    })

    test('inspect root elements of the sections', async ({ page }) => {
        const navigationPage = new NavigationBar(page)

        for (let i = 0; i < expectedSectionTitles.length; ++i) {
            let currentExpectedSectionTitle = expectedSectionTitles[i]

            if(currentExpectedSectionTitle == NavigationBarItem.MyInfo ||
                currentExpectedSectionTitle == NavigationBarItem.Maintenance
            ) {
                currentExpectedSectionTitle = expectedSectionTitles[++i]
            }

            await navigationPage.clickOnSection(currentExpectedSectionTitle)

            await expect(page.locator('.oxd-topbar-header-breadcrumb-module')).toContainText(currentExpectedSectionTitle)
            await expect(page).toHaveURL(
                new RegExp(currentExpectedSectionTitle.toLowerCase())
            )
        }
    })
});
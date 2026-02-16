import { expect } from '@playwright/test'
import { test } from '../fixtures/PageManager'
import { UserDropdownMenuItem } from '../enums/UserDropdownMenuItem'

test('navigate to support page', async ({ page, userDropdownTab, supportPage }) => {
    await userDropdownTab.clickOnUserDropdownMenu()
    await userDropdownTab.clickOnSection(UserDropdownMenuItem.SUPPORT)

    await expect(page).toHaveURL(
        new RegExp(UserDropdownMenuItem.SUPPORT.toLowerCase())
    )
    expect(await supportPage.titleIsVisible()).toBeTruthy()
})
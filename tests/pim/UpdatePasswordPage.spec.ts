import { expect } from '@playwright/test'
import { test } from '../../fixtures/PageManager'
import { UserDropdownMenuItem } from '../../enums/userDropdownMenuItem'

test('navigate to update password page', async ({ myInfoPage, userDropdownTab, updatePasswordPage }) => {
    await myInfoPage.goto()
    await userDropdownTab.clickOnUserDropdownMenu()
    await userDropdownTab.clickOnSection(UserDropdownMenuItem.CHANGE_PASSWORD)

    expect(await updatePasswordPage.titleIsVisible()).toBeTruthy()
})
import { expect } from '@playwright/test'
import { test } from '../../fixtures/PageManager'
import { UserDropdownMenuItem } from '../../enums/UserDropdownMenuItem'

test('navigate to update password page', async ({ page, userDropdownTab, updatePasswordPage }) => {
    await userDropdownTab.clickOnUserDropdownMenu()
    await userDropdownTab.clickOnSection(UserDropdownMenuItem.CHANGE_PASSWORD)

    expect(await updatePasswordPage.titleIsVisible()).toBeTruthy()
})
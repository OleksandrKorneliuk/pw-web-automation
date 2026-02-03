import { expect } from '@playwright/test'
import { test } from '../../test-options'
import { UserDropdownMenuItem } from '../../enums/pages/userDropdownMenuItem'
import { UserDropdownTab } from '../../pages/components/userDropdownTab'
import { UpdatePasswordPage } from '../../pages/pim/UpdatePasswordPage'

test('navigate to update password page', async ({page}) => {
    const userDropdownTab = new UserDropdownTab(page)
        await userDropdownTab.clickOnUserDropdownMenu()
        await userDropdownTab.clickOnSection(UserDropdownMenuItem.ChangePassword)
        const updatePasswordPage = new UpdatePasswordPage(page)

        expect(await updatePasswordPage.titleIsVisible()).toBeTruthy()
})
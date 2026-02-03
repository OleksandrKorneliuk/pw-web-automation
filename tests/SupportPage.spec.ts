import {expect} from '@playwright/test'
import { test } from '../test-options'
import { SupportPage } from '../pages/SupportPage'
import { UserDropdownMenuItem } from '../enums/pages/userDropdownMenuItem'
import { UserDropdownTab } from '../pages/components/userDropdownTab'

test('navigate to support page', async ({page}) => {
    const userDropdownTab = new UserDropdownTab(page)
        await userDropdownTab.clickOnUserDropdownMenu()
        await userDropdownTab.clickOnSection(UserDropdownMenuItem.Support)
        const supportPage = new SupportPage(page)
    
        await expect(page).toHaveURL(
                new RegExp(UserDropdownMenuItem.Support.toLowerCase())
            )
        expect(await supportPage.titleIsVisible()).toBeTruthy()
})
import {expect} from '@playwright/test'
import { test } from '../fixtures/login'
import { SupportPage } from '../pages/SupportPage'
import { UserDropdownMenuItem } from '../enums/UserDropdownMenuItem'
import { UserDropdownTab } from '../pages/components/userDropdownTab'

test('navigate to support page', async ({page}) => {
    const userDropdownTab = new UserDropdownTab(page)
        await userDropdownTab.clickOnUserDropdownMenu()
        await userDropdownTab.clickOnSection(UserDropdownMenuItem.SUPPORT)
        const supportPage = new SupportPage(page)
    
        await expect(page).toHaveURL(
                new RegExp(UserDropdownMenuItem.SUPPORT.toLowerCase())
            )
        expect(await supportPage.titleIsVisible()).toBeTruthy()
})
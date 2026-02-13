
import { UserDropdownMenuItem } from "../../enums/UserDropdownMenuItem";
import { AboutInfoDialogBox } from "../../pages/components/AboutInfoDialogBox";
import { UserDropdownTab } from "../../pages/components/userDropdownTab";
import { test } from "../../fixtures/login";
import { expect } from "@playwright/test";

test('show about info sheet', async ({page}) => {
    const userDropdownTab = new UserDropdownTab(page)
    await userDropdownTab.clickOnUserDropdownMenu()
    await userDropdownTab.clickOnSection(UserDropdownMenuItem.ABOUT)
    const aboutInfoDialogBox = new AboutInfoDialogBox(page)

    expect(await aboutInfoDialogBox.titleIsVisible()).toBeTruthy()
})
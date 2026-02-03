import { UserDropdownMenuItem } from "../../enums/pages/userDropdownMenuItem";
import { AboutInfoDialogBox } from "../../pages/components/AboutInfoDialogBox";
import { UserDropdownTab } from "../../pages/components/userDropdownTab";
import { test } from "../../test-options";
import { expect } from "@playwright/test";

test('show about info sheet', async ({page}) => {
    const userDropdownTab = new UserDropdownTab(page)
    await userDropdownTab.clickOnUserDropdownMenu()
    await userDropdownTab.clickOnSection(UserDropdownMenuItem.About)
    const aboutInfoDialogBox = new AboutInfoDialogBox(page)

    expect(await aboutInfoDialogBox.titleIsVisible()).toBeTruthy()
})
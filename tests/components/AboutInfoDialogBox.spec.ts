
import { UserDropdownMenuItem } from "../../enums/userDropdownMenuItem";
import { test } from "../../fixtures/PageManager";
import { expect } from "@playwright/test";

test('show about info sheet', async ({ page, userDropdownTab, aboutInfoDialogBox }) => {
    await userDropdownTab.clickOnUserDropdownMenu()
    await userDropdownTab.clickOnSection(UserDropdownMenuItem.ABOUT)

    expect(await aboutInfoDialogBox.titleIsVisible()).toBeTruthy()
})
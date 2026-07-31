import { UserDropdownMenuItem } from "../../enums/userDropdownMenuItem";
import { test } from "../../fixtures/PageManager";
import { expect } from "@playwright/test";

test('show about info sheet', async ({ userManagementPage, userDropdownTab, aboutInfoDialogBox }) => {
    await userManagementPage.goto()
    await userDropdownTab.clickOnUserDropdownMenu()
    await userDropdownTab.clickOnSection(UserDropdownMenuItem.ABOUT)

    await expect(aboutInfoDialogBox.title).toBeVisible()
})
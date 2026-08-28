import { UserDropdownMenuItem } from "../../enums/userDropdownMenuItem";
import { test } from "../../fixtures/PageManager";
import { expect } from "@playwright/test";

test('logout', async ({ page, userDropdownTab, loginPage, userManagementPage }) => {
    await userManagementPage.goto()
    await userDropdownTab.clickOnUserDropdownMenu()
    await userDropdownTab.clickOnSection(UserDropdownMenuItem.LOGOUT)

    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(loginPage.title).toBeVisible()
})
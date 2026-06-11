import { UserDropdownMenuItem } from "../../enums/userDropdownMenuItem";
import { test } from "../../fixtures/PageManager";
import { expect } from "@playwright/test";

test('logout', async ({ page, userDropdownTab, loginPage }) => {
    await userDropdownTab.clickOnUserDropdownMenu()
    await userDropdownTab.clickOnSection(UserDropdownMenuItem.LOGOUT)

    await expect(page).toHaveURL(/\/auth\/login/);
    expect(await loginPage.titleIsVisible()).toBeTruthy()
})
import { UserDropdownMenuItem } from "../../enums/UserDropdownMenuItem";
import { UserDropdownTab } from "../../pages/components/userDropdownTab";
import { LoginPage } from "../../pages/LoginPage";
import { test } from "../../fixtures/login";
import { expect } from "@playwright/test";

test('logout', async ({page}) => {
    const userDropdownTab = new UserDropdownTab(page)
    await userDropdownTab.clickOnUserDropdownMenu()
    await userDropdownTab.clickOnSection(UserDropdownMenuItem.LOGOUT)
    const loginPage = new LoginPage(page)

    await expect(page).toHaveURL(/\/auth\/login/);
    expect(await loginPage.titleIsVisible()).toBeTruthy()
})
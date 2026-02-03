import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage';
import { NavigationBar } from '../../pages/components/NavigationBar';
import { NavigationBarItem } from '../../enums/pages/NavigationBarItem';
import { LeavePage } from '../../pages/leave/LeavePage';
import { LeavePageItem } from '../../enums/pages/LeavePageItem';
import { MyLeavePage } from '../../pages/leave/MyLeavePage';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    let loginPage = new LoginPage(page)
    await loginPage.login('Admin', 'admin123');
})

test('navigate to my leave page', async ({page}) => {
    const navbar = new NavigationBar(page)
    await navbar.clickOnSection(NavigationBarItem.Leave)
    const leavePage = new LeavePage(page)
    await leavePage.clickItem(LeavePageItem.MyLeave)
    const assignLeavePage = new MyLeavePage(page)

    expect(await assignLeavePage.titleIsVisible()).toBeTruthy()
})
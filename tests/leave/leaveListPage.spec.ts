import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage';
import { NavigationBar } from '../../pages/components/navigationBar';
import { NavigationBarItem } from '../../enums/pages/NavigationBarItem';
import { LeavePage } from '../../pages/leave/leavePage';
import { LeavePageItem } from '../../enums/pages/LeavePageItem';
import { LeaveListPage } from '../../pages/leave/leaveListPage';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    let loginPage = new LoginPage(page)
    await loginPage.login('Admin', 'admin123');
})

test('navigate to leave list page', async ({page}) => {
    const navbar = new NavigationBar(page)
    await navbar.clickOnSection(NavigationBarItem.Leave)
    const leavePage = new LeavePage(page)
    await leavePage.clickItem(LeavePageItem.LeaveList)
    const assignLeavePage = new LeaveListPage(page)

    expect(await assignLeavePage.titleIsVisible()).toBeTruthy()
})
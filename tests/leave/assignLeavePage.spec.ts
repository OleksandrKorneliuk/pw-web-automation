import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage';
import { NavigationBar } from '../../pages/components/NavigationBar';
import { NavigationBarItem } from '../../enums/pages/NavigationBarItem';
import { LeavePage } from '../../pages/leave/LeavePage';
import { LeavePageItem } from '../../enums/pages/LeavePageItem';
import { AssignLeavePage } from '../../pages/leave/AssignLeavePage';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    let loginPage = new LoginPage(page)
    await loginPage.login('Admin', 'admin123');
})

test('navigate to assign leave page', async ({page}) => {
    const navbar = new NavigationBar(page)
    await navbar.clickOnSection(NavigationBarItem.Leave)
    const leavePage = new LeavePage(page)
    await leavePage.clickItem(LeavePageItem.AssignLeave)
    const assignLeavePage = new AssignLeavePage(page)

    expect(await assignLeavePage.titleIsVisible()).toBeTruthy()
})
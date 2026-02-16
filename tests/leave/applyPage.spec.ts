import { expect } from '@playwright/test'
import { test } from '../../fixtures/login'
import { LoginPage } from '../../pages/LoginPage';
import { NavigationBar } from '../../pages/components/navigationBar';
import { NavigationBarItem } from '../../enums/NavigationBarItem';
import { LeavePage } from '../../pages/leave/leavePage';
import { LeavePageTab } from '../../enums/pages/leave/LeavePageTab';
import { ApplyPage } from '../../pages/leave/applyPage';

test('navigate to apply page', async ({page}) => {
    const navbar = new NavigationBar(page)
    await navbar.clickOnSection(NavigationBarItem.LEAVE)
    const leavePage = new LeavePage(page)
    await leavePage.clickItem(LeavePageTab.APPLY)
    const assignLeavePage = new ApplyPage(page)

    expect(await assignLeavePage.titleIsVisible()).toBeTruthy()
})
import { expect } from '@playwright/test'
import { test } from '../../fixtures/login'
import { NavigationBar } from '../../pages/components/navigationBar';
import { NavigationBarItem } from '../../enums/NavigationBarItem';
import { LeavePage } from '../../pages/leave/leavePage';
import { LeavePageTab } from '../../enums/pages/leave/LeavePageTab';
import { LeaveListPage } from '../../pages/leave/leaveListPage';

test('navigate to leave list page', async ({page}) => {
    const navbar = new NavigationBar(page)
    await navbar.clickOnSection(NavigationBarItem.LEAVE)
    const leavePage = new LeavePage(page)
    await leavePage.clickItem(LeavePageTab.LEAVE_LIST)
    const assignLeavePage = new LeaveListPage(page)

    expect(await assignLeavePage.titleIsVisible()).toBeTruthy()
})
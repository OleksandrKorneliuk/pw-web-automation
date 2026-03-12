import { expect } from '@playwright/test'
import { test } from '../../fixtures/PageManager'
import { NavigationBarItem } from '../../enums/NavigationBarItem';
import { LeavePageTab } from '../../enums/pages/leave/LeavePageTab';

test('navigate to leave list page', async ({navigationBar, leavePage, leaveListPage}) => {
    await navigationBar.clickOnSection(NavigationBarItem.LEAVE)
    await leavePage.clickItem(LeavePageTab.LEAVE_LIST)

    expect(await leaveListPage.titleIsVisible()).toBeTruthy()
})
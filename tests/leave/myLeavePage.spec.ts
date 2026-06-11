import { expect } from '@playwright/test'
import { test } from '../../fixtures/PageManager'
import { NavigationBarItem } from '../../enums/navigationBarItem';
import { LeavePageTab } from '../../enums/pages/leave/leavePageTab';

test('navigate to my leave page', async ({ navigationBar, leavePage, myLeavePage }) => {
    await navigationBar.clickOnSection(NavigationBarItem.LEAVE)
    await leavePage.clickItem(LeavePageTab.MY_LEAVE)

    expect(await myLeavePage.titleIsVisible()).toBeTruthy()
})
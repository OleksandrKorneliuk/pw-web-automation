import { expect } from '@playwright/test'
import { test } from '../../fixtures/PageManager'
import { NavigationBarItem } from '../../enums/navigationBarItem';
import { LeavePageTab } from '../../enums/pages/leave/leavePageTab';

test('navigate to apply page', async ({ navigationBar, leavePage, applyPage }) => {
    await navigationBar.clickOnSection(NavigationBarItem.LEAVE)
    await leavePage.clickItem(LeavePageTab.APPLY)

    expect(await applyPage.titleIsVisible()).toBeTruthy()
})
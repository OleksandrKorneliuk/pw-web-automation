import { expect } from '@playwright/test'
import { test } from '../../fixtures/PageManager'
import { LeavePageTab } from '../../enums/pages/leave/leavePageTab';

test('navigate to my leave page', async ({ leavePage, myLeavePage }) => {
    await leavePage.goto()
    await leavePage.clickItem(LeavePageTab.MY_LEAVE)

    await expect(myLeavePage.title).toBeVisible()
})
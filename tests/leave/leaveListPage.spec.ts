import { expect } from '@playwright/test'
import { test } from '../../fixtures/PageManager'
import { LeavePageTab } from '../../enums/pages/leave/leavePageTab';

test('navigate to leave list page', async ({ leavePage, leaveListPage }) => {
    await leavePage.goto()
    await leavePage.clickItem(LeavePageTab.LEAVE_LIST)

    await expect(leaveListPage.title).toBeVisible()
})
import { expect } from '@playwright/test'
import { test } from '../../fixtures/PageManager'
import { LeavePageTab } from '../../enums/pages/leave/leavePageTab';

test('navigate to apply page', async ({ leavePage, applyPage }) => {
    await leavePage.goto()
    await leavePage.clickItem(LeavePageTab.APPLY)

    await expect(applyPage.title).toBeVisible()
})
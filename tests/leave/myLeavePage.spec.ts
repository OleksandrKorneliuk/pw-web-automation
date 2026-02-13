import { expect } from '@playwright/test'
import { test } from '../../fixtures/login'
import { NavigationBar } from '../../pages/components/navigationBar';
import { NavigationBarItem } from '../../enums/NavigationBarItem';
import { LeavePage } from '../../pages/leave/leavePage';
import { LeavePageTab } from '../../enums/pages/leave/LeavePageTab';
import { MyLeavePage } from '../../pages/leave/myLeavePage';

test('navigate to my leave page', async ({page}) => {
    const navbar = new NavigationBar(page)
    await navbar.clickOnSection(NavigationBarItem.LEAVE)
    const leavePage = new LeavePage(page)
    await leavePage.clickItem(LeavePageTab.MY_LEAVE)
    const assignLeavePage = new MyLeavePage(page)

    expect(await assignLeavePage.titleIsVisible()).toBeTruthy()
})
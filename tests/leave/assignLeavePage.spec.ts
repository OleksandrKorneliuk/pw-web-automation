import { expect } from '@playwright/test'
import { test } from '../../test-options'
import { NavigationBar } from '../../pages/components/navigationBar';
import { NavigationBarItem } from '../../enums/pages/NavigationBarItem';
import { LeavePage } from '../../pages/leave/leavePage';
import { LeavePageItem } from '../../enums/pages/LeavePageItem';
import { AssignLeavePage } from '../../pages/leave/assignLeavePage';
import { addNewEmployeeViaUI, deleteEmployeeViaUI } from '../helpers/employee.helpers';

test('navigate to assign leave page', async ({ page }) => {
    const navbar = new NavigationBar(page)
    await navbar.clickOnSection(NavigationBarItem.Leave)
    const leavePage = new LeavePage(page)
    await leavePage.clickItem(LeavePageItem.AssignLeave)

    const assignLeavePage = new AssignLeavePage(page)
    expect(await assignLeavePage.titleIsVisible()).toBeTruthy()
})

test('assign new leave', async ({ page }) => {
    const employee = await addNewEmployeeViaUI(page)

    const navbar = new NavigationBar(page)
    await navbar.clickOnSection(NavigationBarItem.Leave)
    const leavePage = new LeavePage(page)
    await leavePage.clickItem(LeavePageItem.AssignLeave)
    const assignLeavePage = new AssignLeavePage(page)

    const employeeFullName = `${employee.firstName} ${employee.lastName}`
    await assignLeavePage.enterEmployeeName(employeeFullName)

    await deleteEmployeeViaUI(page, employee.id)
})
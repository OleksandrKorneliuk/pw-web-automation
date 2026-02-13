import { expect } from '@playwright/test'
import { test } from '../../fixtures/login'
import { NavigationBar } from '../../pages/components/navigationBar';
import { NavigationBarItem } from '../../enums/NavigationBarItem';
import { LeavePage } from '../../pages/leave/leavePage';
import { LeavePageTab } from '../../enums/pages/leave/LeavePageTab';
import { AssignLeavePage } from '../../pages/leave/assignLeavePage';
import { addNewEmployeeViaUI, deleteEmployeeViaUI } from '../helpers/employee.helpers';
import { LeaveTypeOptions } from '../../enums/pages/leave/LeaveTypeOptions';

test('navigate to assign leave page', async ({ page }) => {
    const navbar = new NavigationBar(page)
    await navbar.clickOnSection(NavigationBarItem.LEAVE)
    const leavePage = new LeavePage(page)
    await leavePage.clickItem(LeavePageTab.ASSIGN_LEAVE)

    const assignLeavePage = new AssignLeavePage(page)
    expect(await assignLeavePage.titleIsVisible()).toBeTruthy()
})

test('assign new leave', async ({ page }) => {
    test.setTimeout(45000)

    const employee = await addNewEmployeeViaUI(page)

    const navbar = new NavigationBar(page)
    await navbar.clickOnSection(NavigationBarItem.LEAVE)
    const leavePage = new LeavePage(page)
    await leavePage.clickItem(LeavePageTab.ASSIGN_LEAVE)
    const assignLeavePage = new AssignLeavePage(page)

    const employeeFullName = `${employee.firstName} ${employee.lastName}`
    await assignLeavePage.enterEmployeeName(employeeFullName)
    await assignLeavePage.choseLeaveOption(LeaveTypeOptions.CAN_BEREAVEMENT)
    await assignLeavePage.selectFirstDayOfLeave(3)
    await assignLeavePage.selectLastDayOfLeave(6)
    await assignLeavePage.clickAssignButton()

    await assignLeavePage.isDialogBoxHeaderContains('Confirm Leave Assignment')
    await assignLeavePage.confirmLeaveAssignment()

    await deleteEmployeeViaUI(page, employee.id)
})
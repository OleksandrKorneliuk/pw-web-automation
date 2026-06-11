import { expect } from '@playwright/test'
import { test } from '../../fixtures/PageManager'
import { NavigationBarItem } from '../../enums/navigationBarItem';
import { LeavePageTab } from '../../enums/pages/leave/leavePageTab';
import { addNewEmployeeViaUI, deleteEmployeeViaUI } from '../helpers/employee.helpers';
import { LeaveTypeOptions } from '../../enums/pages/leave/leaveTypeOptions';

test('navigate to assign leave page', async ({ navigationBar, leavePage, assignLeavePage }) => {
    await navigationBar.clickOnSection(NavigationBarItem.LEAVE)
    await leavePage.clickItem(LeavePageTab.ASSIGN_LEAVE)

    expect(await assignLeavePage.titleIsVisible()).toBeTruthy()
})

test('assign new leave', async ({ page, navigationBar, leavePage, assignLeavePage }) => {
    test.setTimeout(45000)

    const employee = await addNewEmployeeViaUI(page)

    await navigationBar.clickOnSection(NavigationBarItem.LEAVE)
    await leavePage.clickItem(LeavePageTab.ASSIGN_LEAVE)

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
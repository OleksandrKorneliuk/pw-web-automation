import { expect } from '@playwright/test'
import { test } from '../../fixtures/employee'
import { LeavePageTab } from '../../enums/pages/leave/leavePageTab';
import { LeaveTypeOptions } from '../../enums/pages/leave/leaveTypeOptions';

test.describe('assign leave page', () => {
    test('navigate to assign leave page', async ({ leavePage, assignLeavePage }) => {
        await leavePage.goto()
        await leavePage.clickItem(LeavePageTab.ASSIGN_LEAVE)

        await expect(assignLeavePage.title).toBeVisible()
    })

    test('assign new leave', async ({ employee, assignLeavePage }) => {
        await assignLeavePage.goto()

        const firstDay = new Date()
        firstDay.setDate(firstDay.getDate() + 3)

        const lastDay = new Date()
        lastDay.setDate(lastDay.getDate() + 6)

        const employeeFullName = `${employee.firstName} ${employee.lastName}`
        await assignLeavePage.enterEmployeeName(employeeFullName)
        await assignLeavePage.choseLeaveOption(LeaveTypeOptions.CAN_BEREAVEMENT)
        await assignLeavePage.selectFirstDayOfLeave(firstDay)
        await assignLeavePage.selectLastDayOfLeave(lastDay)
        await assignLeavePage.clickAssignButton()

        await expect(assignLeavePage.confirmLeaveDialogBox).toContainText('Confirm Leave Assignment')
        await assignLeavePage.confirmLeaveAssignment()
    })
});
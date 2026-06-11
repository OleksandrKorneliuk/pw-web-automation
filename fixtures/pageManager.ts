import { test as base } from '@playwright/test';
import { AdminPage } from '../pages/admin/adminPage';
import { OrganizationStructurePage } from '../pages/admin/organizationStructurePage';
import { NavigationBar } from '../pages/components/navigationBar';
import { PimPage } from '../pages/pim/PimPage';
import { AddEmployeePage } from '../pages/pim/addEmployeePage';
import { UserManagementPage } from '../pages/admin/UserManagementPage';
import { AddSystenUserPage } from '../pages/admin/addSystemUserPage';
import { EmployeeListPage } from '../pages/pim/employeeListPage';
import { UserDropdownTab } from '../pages/components/userDropdownTab';
import { AboutInfoDialogBox } from '../pages/components/aboutInfoDialogBox';
import { LoginPage } from '../pages/loginPage';
import { LeavePage } from '../pages/leave/LeavePage';
import { ApplyLeavePage } from '../pages/leave/applyLeavePage';
import { AssignLeavePage } from '../pages/leave/assignLeavePage';
import { MyLeavePage } from '../pages/leave/myLeavePage';
import { LeaveListPage } from '../pages/leave/leaveListPage';
import { UpdatePasswordPage } from '../pages/pim/updatePasswordPage';
import { SupportPage } from '../pages/supportPage';
import { MyInfoPage } from '../pages/myInfo/MyInfoPage';

export type TestOptions = {
    navigationBar: NavigationBar
    adminPage: AdminPage
    organizationStructurePage: OrganizationStructurePage
    pimPage: PimPage
    addEmployeePage: AddEmployeePage
    userManagementPage: UserManagementPage
    addSystemUserPage: AddSystenUserPage
    employeeListPage: EmployeeListPage
    userDropdownTab: UserDropdownTab
    aboutInfoDialogBox: AboutInfoDialogBox
    loginPage: LoginPage
    leavePage: LeavePage
    applyPage: ApplyLeavePage
    assignLeavePage: AssignLeavePage
    leaveListPage: LeaveListPage
    myLeavePage: MyLeavePage
    updatePasswordPage: UpdatePasswordPage
    supportPage: SupportPage
    myInfoPage: MyInfoPage
}

export const test = base.extend<TestOptions>({

    navigationBar: async ({ page }, use) => {
        await use(new NavigationBar(page))
    },

    userDropdownTab: async ({ page }, use) => {
        await use(new UserDropdownTab(page))
    },

    aboutInfoDialogBox: async ({ page }, use) => {
        await use(new AboutInfoDialogBox(page))
    },

    applyPage: async ({ page }, use) => {
        await use(new ApplyLeavePage(page))
    },

    assignLeavePage: async ({ page }, use) => {
        await use(new AssignLeavePage(page))
    },

    adminPage: async ({ page }, use) => {
        await use(new AdminPage(page))
    },

    organizationStructurePage: async ({ page }, use) => {
        await use(new OrganizationStructurePage(page))
    },

    pimPage: async ({ page }, use) => {
        await use(new PimPage(page))
    },

    addEmployeePage: async ({ page }, use) => {
        await use(new AddEmployeePage(page))
    },

    userManagementPage: async ({ page }, use) => {
        await use(new UserManagementPage(page))
    },

    addSystemUserPage: async ({ page }, use) => {
        await use(new AddSystenUserPage(page))
    },

    employeeListPage: async ({ page }, use) => {
        await use(new EmployeeListPage(page))
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },

    leavePage: async ({ page }, use) => {
        await use(new LeavePage(page))
    },

    leaveListPage: async ({ page }, use) => {
        await use(new LeaveListPage(page))
    },

    myLeavePage: async ({ page }, use) => {
        await use(new MyLeavePage(page))
    },

    updatePasswordPage: async ({ page }, use) => {
        await use(new UpdatePasswordPage(page))
    },

    supportPage: async ({ page }, use) => {
        await use(new SupportPage(page))
    },

    myInfoPage: async ({page}, use) => {
        await use(new MyInfoPage(page))
    }
})
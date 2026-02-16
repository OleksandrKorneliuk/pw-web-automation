import { test as base } from './Login';
import { AdminPage } from '../pages/admin/AdminPage';
import { OrganizationStructurePage } from '../pages/admin/OrganizationStructurePage';
import { NavigationBar } from '../pages/components/navigationBar';
import { PimPage } from '../pages/pim/PimPage';
import { AddEmployeePage } from '../pages/pim/AddEmployeePage';
import { UserManagementPage } from '../pages/admin/UserManagementPage';
import { AddSystenUserPage } from '../pages/admin/addSystemUserPage';
import { EditUserPage } from '../pages/admin/EditUserPage';
import { EmployeeListPage } from '../pages/pim/EmployeeListPage';
import { UserDropdownTab } from '../pages/components/userDropdownTab';
import { AboutInfoDialogBox } from '../pages/components/AboutInfoDialogBox';
import { LoginPage } from '../pages/LoginPage';
import { LeavePage } from '../pages/leave/LeavePage';
import { ApplyPage } from '../pages/leave/ApplyPage';
import { AssignLeavePage } from '../pages/leave/AssignLeavePage';
import { MyLeavePage } from '../pages/leave/MyLeavePage';
import { LeaveListPage } from '../pages/leave/LeaveListPage';
import { UpdatePasswordPage } from '../pages/pim/UpdatePasswordPage';
import { SupportPage } from '../pages/SupportPage';

export type TestOptions = {
    navigationBar: NavigationBar
    adminPage: AdminPage
    organizationStructurePage: OrganizationStructurePage
    pimPage: PimPage
    addEmployeePage: AddEmployeePage
    userManagementPage: UserManagementPage
    addSystemUserPage: AddSystenUserPage
    editUserPage: EditUserPage
    employeeListPage: EmployeeListPage
    userDropdownTab: UserDropdownTab
    aboutInfoDialogBox: AboutInfoDialogBox
    loginPage: LoginPage
    leavePage: LeavePage
    applyPage: ApplyPage
    assignLeavePage: AssignLeavePage
    leaveListPage: LeaveListPage
    myLeavePage: MyLeavePage
    updatePasswordPage: UpdatePasswordPage
    supportPage: SupportPage
}

export const test = base.extend<TestOptions>({

    navigationBar: async ({ page }, use) => {
        await use(new NavigationBar(page))
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

    editUserPage: async ({ page }, use) => {
        await use(new EditUserPage(page))
    },

    employeeListPage: async ({ page }, use) => {
        await use(new EmployeeListPage(page))
    },

    userDropdownTab: async ({ page }, use) => {
        await use(new UserDropdownTab(page))
    },

    aboutInfoDialogBox: async ({ page }, use) => {
        await use(new AboutInfoDialogBox(page))
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
    }
})
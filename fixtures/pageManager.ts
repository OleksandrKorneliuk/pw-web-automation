import { test as base } from '../fixtures/login';
import { AdminPage } from '../pages/admin/AdminPage';
import { OrganizationStructurePage } from '../pages/admin/OrganizationStructurePage';
import { NavigationBar } from '../pages/components/navigationBar';

export type TestOptions = {
    navigationBar: NavigationBar
    adminPage: AdminPage
    organizationStructurePage: OrganizationStructurePage
}

export const test = base.extend<TestOptions>({

    navigationBar: async ({ page }, use) => {
        await use(new NavigationBar(page))
    },

    adminPage: async ({page}, use) => {
        await use(new AdminPage(page))
    },

    organizationStructurePage: async ({page}, use) => {
        await use(new OrganizationStructurePage(page))
    }
})
import { expect } from '@playwright/test'
import { test } from '../../test-options';
import { NavigationBar } from '../../pages/components/navigationBar';
import { NavigationBarItem } from '../../enums/NavigationBarItem';
import { AdminPage } from '../../pages/admin/AdminPage';
import { OrganizationPageOption } from '../../enums/pages/admin/OrganizationTabOption';
import { OrganizationStructurePage } from '../../pages/admin/OrganizationStructurePage';
import { AdminPageTab } from '../../enums/pages/admin/AdminPageTab';

test('create new organization sub-units', async ({ page }) => {
    test.setTimeout(45000)
    const navigationBar = new NavigationBar(page)
    navigationBar.clickOnSection(NavigationBarItem.Admin)
    const adminPage = new AdminPage(page)
    await adminPage.clickOnTab(AdminPageTab.ORGANIZATION)
    await adminPage.clickOnOrganizationTabOption(OrganizationPageOption.STRUCTURE)
    const organizationStructurePage = new OrganizationStructurePage(page)
    expect(await organizationStructurePage.titleIsVisible('AdminOrganization')).toBeTruthy()

    await organizationStructurePage.enableEditStructureMode()
    await organizationStructurePage.addNewOrganizationUnit('TestUnit')

    await organizationStructurePage.addNewSubUnit('SubTestUnit')
    await organizationStructurePage.expandSubUnits()
    expect(await organizationStructurePage.isOrganizationUnitCreated('TestUnit')).toBeTruthy()
    expect(await organizationStructurePage.isOrganizationUnitCreated('SubTestUnit')).toBeTruthy()

    await organizationStructurePage.deleteOrganizationUnit()
    expect(await organizationStructurePage.successfullyDeletedWarningIsVisible()).toBeTruthy()
});
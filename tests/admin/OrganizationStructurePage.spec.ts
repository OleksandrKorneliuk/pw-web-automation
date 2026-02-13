import { expect } from '@playwright/test'
import { test } from '../../fixtures/PageManager';
import { NavigationBarItem } from '../../enums/NavigationBarItem';
import { OrganizationPageOption } from '../../enums/pages/admin/OrganizationTabOption';
import { AdminPageTab } from '../../enums/pages/admin/AdminPageTab';

test('create new organization sub-units', async ({ navigationBar, adminPage, organizationStructurePage }) => {
    test.setTimeout(45000)
    await navigationBar.clickOnSection(NavigationBarItem.ADMIN)
    await adminPage.clickOnTab(AdminPageTab.ORGANIZATION)
    await adminPage.clickOnOrganizationTabOption(OrganizationPageOption.STRUCTURE)
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
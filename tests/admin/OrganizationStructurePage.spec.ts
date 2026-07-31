import { expect } from '@playwright/test'
import { test } from '../../fixtures/subunit';
import { createRandomSubunit } from '../factorys/subunitFactory';

test.describe('subunits page', () => {
    test('create new organization sub-units', async ({ organizationStructurePage, subunit }) => {
        await organizationStructurePage.goto()

        await organizationStructurePage.enableEditStructureMode()
        const newSubunit = createRandomSubunit()
        const subunitFullName = `${subunit.unitId}: ${subunit.name}`
        await organizationStructurePage.addSubunitFor(subunitFullName, newSubunit)
        await organizationStructurePage.expandSubunitsFor(subunitFullName)
        expect(await organizationStructurePage.isOrganizationUnitCreated(subunitFullName)).toBeTruthy()
    });
})
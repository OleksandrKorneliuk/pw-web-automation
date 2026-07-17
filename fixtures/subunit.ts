import { test as base } from './employee';
import { createApiContext } from '../helpers/apiContext.helper';
import { Subunit } from '../models/subunit';
import { SubunitsService } from '../api/services/subunitsService';
import { createRandomSubunit } from '../tests/factorys/subunitFactory';

export const test = base.extend<{ subunit: Subunit }>({
    subunit: async ({}, use) => {
        const apiContext = await createApiContext()

        const subunitsService = new SubunitsService(apiContext)
        const newSubunit = createRandomSubunit()
        const subunitId = await subunitsService.createSubunitAndExpect(newSubunit)

        await use(newSubunit)

        await subunitsService.deleteSubunitAndExpect(subunitId)
    }
})
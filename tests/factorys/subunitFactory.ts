import { faker } from "@faker-js/faker";
import { Subunit } from "../../models/subunit";

export function createRandomSubunit(parentId?: number) {
    if (parentId === undefined) {
        parentId = 1
    }

    const subunit: Subunit = {
        unitId: faker.string.numeric(2),
        name: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        parentId: parentId
    }

    return subunit;
}
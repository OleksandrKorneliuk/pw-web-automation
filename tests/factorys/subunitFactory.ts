import { faker } from "@faker-js/faker";

export function createRandomSubunit(parentId?: number) {
    if (parentId === undefined) {
        parentId = 1
    }

    return {
        unitId: faker.string.numeric(2),
        name: faker.commerce.department(),
        description: faker.commerce.productDescription(),
        parentId: parentId
    }
}
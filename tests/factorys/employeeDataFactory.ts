import { faker } from '@faker-js/faker'

export function createRandomEmployeeData() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        id: faker.string.numeric(8)
    }
}
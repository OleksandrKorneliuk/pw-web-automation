import { faker } from '@faker-js/faker'

export async function createRandomEmployee() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        id: '9' + faker.string.numeric(8)
    }
}
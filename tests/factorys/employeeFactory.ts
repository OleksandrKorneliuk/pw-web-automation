import { faker } from '@faker-js/faker'
import { Employee } from '../../models/employee'
import { Gender } from '../../enums/pages/myInfo/genders'

export function createRandomEmployee() {
    const employee: Employee = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        id: faker.string.numeric(8),
        driverLicenseNumber: faker.string.alphanumeric({ length: 8 }),
        number: undefined,
        nationality: faker.location.country(),
        gender: faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE])
    }

    return employee;
}
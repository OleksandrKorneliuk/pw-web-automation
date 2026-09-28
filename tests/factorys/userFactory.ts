import { faker } from "@faker-js/faker";
import { UserRole } from "../../enums/userRole";
import { Employee } from "../../models/employee";
import { User } from "../../models/user";

export async function createRandomUser(employee: Employee, role: UserRole, isEnabled: boolean): Promise<User> {
    return {
        username: `${employee.firstName.toLowerCase()}_${employee.lastName.toLowerCase()}${Date.now()}`,
        password: generatePassword(),
        isEnabled: isEnabled,
        userRoleId: role,
        id: undefined,
        empNumber: employee.number
    };
}

function generatePassword(): string {
    let password = "";

    while (!/\d/.test(password)) {
        password = faker.internet.password({ length: 12, memorable: false });
    }

    return password;
}
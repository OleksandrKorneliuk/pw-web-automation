import { faker } from "@faker-js/faker";
import { UserRole } from "../../enums/userRole";
import { Employee } from "../../models/employee";
import { UserData } from "../../models/userData";

export function createUserData(employee: Employee, role: UserRole, isEnabled: boolean): UserData {
    return {
        username: `${employee.firstName} ${employee.lastName}`,
        password: faker.internet.password(),
        isEnabled: isEnabled,
        userRoleId: role,
        empNumber: employee.number
    }
}
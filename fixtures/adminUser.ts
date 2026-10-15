import { test as base } from './employee';
import { createApiContext } from '../helpers/apiContext.helper';
import { UserService } from '../api/services/userService';
import { User } from '../models/user';
import { createRandomUser } from '../tests/factorys/userFactory';
import { UserRole } from '../enums/userRole';

export const test = base.extend<{ adminUser: User }>({
    adminUser: async ({ employee }, use) => {
        const apiContext = await createApiContext()

        const userService = new UserService(apiContext)
        const adminUserData = await createRandomUser(employee, UserRole.ADMIN, true)
        const adminUser = await userService.addUserAndExpect(adminUserData)

        await use(adminUser)
           
        await userService.deleteUserAndExpect(adminUser.id)
    }
})
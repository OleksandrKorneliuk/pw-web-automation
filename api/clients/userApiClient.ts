import { BaseApiClient } from "./baseApiClient";
import { APIRequestContext } from "@playwright/test";
import { User } from "../../models/user";

export class UserApiClient extends BaseApiClient {

    private static ADMIN_ENDPOINT = '/admin/users';

    constructor(apiContext: APIRequestContext) {
        super(apiContext)
    }

    async postUser(user: User) {
        return await this.post(UserApiClient.ADMIN_ENDPOINT,
            UserApiClient.buildEmployeePayload(user)
        );
    }

    async deleteEmployee(userNumber: string) {
        return await this.delete(UserApiClient.ADMIN_ENDPOINT,
            { ids: [userNumber] });
    }

    private static buildEmployeePayload(user: User) {
        return {
            username: user.username,
            password: user.password,
            status: user.isEnabled,
            userRoleId: user.userRoleId,
            empNumber: user.empNumber,
        }
    }
}
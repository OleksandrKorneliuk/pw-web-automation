import { BaseApiClient } from "./baseApiClient";
import { APIRequestContext } from "@playwright/test";
import { UserData } from "../../models/userData";

export class UserApiClient extends BaseApiClient {

    private static ADMIN_ENDPOINT = '/admin/users';

    constructor(apiContext: APIRequestContext) {
        super(apiContext)
    }

    async postUser(userData: UserData) {
        return await this.post(UserApiClient.ADMIN_ENDPOINT,
            UserApiClient.buildEmployeePayload(userData)
        );
    }

    async deleteEmployee(userNumber: string) {
        return await this.delete(UserApiClient.ADMIN_ENDPOINT,
            { ids: [userNumber] });
    }

    private static buildEmployeePayload(userData: UserData) {
        return {
            username: userData.username,
            password: userData.password,
            status: userData.isEnabled,
            userRoleId: userData.userRoleId,
            empNumber: userData.empNumber,
        }
    }
}
import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { UserApiClient } from "../clients/userApiClient";
import { User } from "../../models/user";
import { UserData } from "../../models/userData";

export class UserService {
    private client: UserApiClient

    constructor(apiContext: APIRequestContext) {
        this.client = new UserApiClient(apiContext)
    }

    async addUserAndExpect(userData: UserData) {
        const response = await this.client.postUser(userData)
        expect(response.status()).toBe(200)
        const userNumber = await this.getUserNumber(response)
        return await this.getCompletedUser(userData, userNumber)
    }

    private async getUserNumber(postNewEmployeeResponse: APIResponse): Promise<string> {
        const body = await postNewEmployeeResponse.json()
        return Promise.resolve(body.data.id)
    }

    private async getCompletedUser(userData: UserData, id: string): Promise<User> {
        return {
            username: userData.username,
            password: userData.password,
            isEnabled: userData.isEnabled,
            userRoleId: userData.userRoleId,
            id: id
        }
    }

    async deleteUserAndExpect(userNumber: string) {
        const response = await this.client.deleteEmployee(userNumber)
        expect(response.status()).toBe(200)
    }

}
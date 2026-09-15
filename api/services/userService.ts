import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { UserApiClient } from "../clients/userApiClient";
import { User } from "../../models/user";

export class UserService {
    private client: UserApiClient

    constructor(apiContext: APIRequestContext) {
        this.client = new UserApiClient(apiContext)
    }

    async addUserAndExpect(user: User): Promise<User> {
        const response = await this.client.postUser(user)
        expect(response.status()).toBe(200)
        const userId = await this.getUserId(response)
        user.id = userId

        return Promise.resolve(user)
    }

    private async getUserId(postNewEmployeeResponse: APIResponse): Promise<string> {
        const body = await postNewEmployeeResponse.json()
        return Promise.resolve(body.data.id)
    }

    async deleteUserAndExpect(userNumber?: string) {
        if (!userNumber) {
            throw new Error('User number is required to delete a user')
        }

        const response = await this.client.deleteEmployee(userNumber)
        expect(response.status()).toBe(200)
    }
}
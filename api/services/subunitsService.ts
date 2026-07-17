import { APIRequestContext, expect } from "@playwright/test";
import { SubunitsApiClient } from "../clients/subunitsApiClient";
import { Subunit } from "../../models/subunit";

export class SubunitsService {
    private client: SubunitsApiClient

    constructor(apiContext: APIRequestContext) {
        this.client = new SubunitsApiClient(apiContext);
    }

    async createSubunitAndExpect(subunit: Subunit) {
        const response = await this.client.postSubunit(subunit);
        expect(response.status()).toBe(200);
        return this.getSubunitId(response);
    }

    async getSubunitId(postNewSubunitResponse: any) {
        const body = await postNewSubunitResponse.json();
        return body.data.id;
    }

    async deleteSubunitAndExpect(id: string) {
        const response = await this.client.deleteSubunit(id);
        expect(response.status()).toBe(200);
    }
}
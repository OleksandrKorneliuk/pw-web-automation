import { APIRequestContext, APIResponse, expect } from "@playwright/test";
import { JobTitlesApiClient } from "../clients/jobTitlesApiClient";
import { JobTitle } from "../../models/jobTitle";

export class JobTitlesService {

    private client: JobTitlesApiClient;

    constructor(apiContext: APIRequestContext) {
        this.client = new JobTitlesApiClient(apiContext);
    }

    async createJobTitleAndExpect(jobTitle: JobTitle) {
        const response = await this.client.postJobTitle(jobTitle);
        expect(response.status()).toBe(200);
        return this.getJobTitleId(response);
    }

    async getJobTitleId(postNewJobTitleResponse: APIResponse) {
        const body = await postNewJobTitleResponse.json();
        return body.data.id;
    }

    async deleteJobTitleAndExpect(id: number) {
        const response = await this.client.deleteJobTitle(id);
        expect([200, 204, 404, 401].includes(response.status())).toBeTruthy();
    }
}
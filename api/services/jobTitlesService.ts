import { APIRequestContext, APIResponse, expect, Page } from "@playwright/test";
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
        jobTitle.id = await this.getJobTitleId(response);
        return jobTitle;
    }

    async getJobTitleId(postNewJobTitleResponse: APIResponse) {
        const body = await postNewJobTitleResponse.json();
        return body.data.id;
    }

    async deleteJobTitleAndExpect(id?: number) {
        if (!id) {
            throw new Error('Job Title id is required to delete an job title');
        }

        const response = await this.client.deleteJobTitle(id);
        expect([200, 204, 404, 401].includes(response.status())).toBeTruthy();
    }

    async interceptJobTitleId(page: Page): Promise<number> {
        const createEmployeeResponse = await page.waitForResponse(
            response => response.url().includes('api/v2/admin/job-titles')
                && response.status() === 200
                && response.request().method() === 'POST',
            { timeout: 10_000 }
        );
        const responseBody = await createEmployeeResponse.json();
        const jobTitleId = responseBody.data.id;
        if (jobTitleId === undefined) {
            throw new Error('Employee number not found in API response. Response data: ' + JSON.stringify(responseBody.data));
        }

        return jobTitleId;
    }
}
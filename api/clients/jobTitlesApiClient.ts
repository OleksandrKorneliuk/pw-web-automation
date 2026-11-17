import { BaseApiClient } from "./baseApiClient";
import { APIRequestContext } from "@playwright/test";
import { JobTitle } from "../../models/jobTitle";

export class JobTitlesApiClient extends BaseApiClient {

    private static JOB_TITLES_ENDPOINT = '/admin/job-titles';

    constructor(apiContext: APIRequestContext) {
        super(apiContext);
    }

    async postJobTitle(jobTitle: JobTitle) {
        return await this.post(JobTitlesApiClient.JOB_TITLES_ENDPOINT,
            JobTitlesApiClient.buildJobTitlePayload(jobTitle)
        );
    }

    async deleteJobTitle(id: number) {
        return await this.delete(JobTitlesApiClient.JOB_TITLES_ENDPOINT,
            { "ids": [id] }
        );
    }

    private static buildJobTitlePayload(jobTitle: JobTitle) {
        return {
            title: jobTitle.title,
            description: jobTitle.description,
            specification: jobTitle.specification,
            note: jobTitle.note
        };
    }
}
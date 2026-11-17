import { test, expect } from '@playwright/test';
import { createApiContext } from '../../../helpers/apiContext.helper';
import { createRandomJobTitle } from '../../factorys/jobTitleFactory';
import { JobTitlesApiClient } from '../../../api/clients/jobTitlesApiClient';

test.describe('Job Title API', () => {
    test('Create a new job title with valid data', async () => {
        const apiContext = await createApiContext();
        const jobTitle = await createRandomJobTitle();
        const jobTitleClient = new JobTitlesApiClient(apiContext);
        const response = await jobTitleClient.postJobTitle(jobTitle);
        expect(response.status()).toBe(200);
        const body = await response.json();
        const jobTitleId = body.data.id;
        const deleteJobTitleResponse = await jobTitleClient.deleteJobTitle(jobTitleId);
        expect(deleteJobTitleResponse.status()).toBe(200);
    });
});
// spec: specs/job-titles-plan.md
// seed: tests/seed.spec.ts

import { expect, Page } from '@playwright/test';
import { test } from '../../../fixtures/PageManager';
import { createApiContext } from '../../../helpers/apiContext.helper';
import { JobTitlesService } from '../../../api/services/jobTitlesService';

test.describe('job-title-management', () => {
    test('Load job titles page and verify default content', async ({ jobTitlesPage }) => {
        await jobTitlesPage.goto();

        await expect(jobTitlesPage.pageHeader).toBeVisible();
        await expect(jobTitlesPage.jobTitlesTable).toBeVisible();
        await expect(jobTitlesPage.recordsSummary).toBeVisible();

        await expect(jobTitlesPage.pageHeader).toHaveText('Job Titles');
        await expect(jobTitlesPage.jobTitlesColumnHeader).toBeVisible();
        await expect(jobTitlesPage.jobDescriptionColumnHeader).toBeVisible();
        await expect(jobTitlesPage.actionsColumnHeader).toBeVisible();

        await expect(jobTitlesPage.addButton).toBeVisible();
        await expect(jobTitlesPage.addButton).toBeEnabled();
    });

    test('Create a new job title with valid data', async ({ page, jobTitlesPage }) => {
        const apiContext = await createApiContext();
        const jobTitleService = new JobTitlesService(apiContext);

        const jobTitle = `Automation QA Engineer ${Date.now()}`;
        const jobDescription = `Created via Playwright automation ${Date.now()}`;

        await jobTitlesPage.goto();

        await jobTitlesPage.addButton.click();

        const form = page.locator('form');
        await form.getByRole('textbox').first().fill(jobTitle);
        await form.getByRole('textbox').nth(1).fill(jobDescription);

        await page.getByRole('button', { name: 'Save' }).click();

        const jobTitleId = await interceptJobTitleId(page);

        try {
            await expect(page).toHaveURL(/\/admin\/viewJobTitleList/);
            await expect(page.getByRole('heading', { name: 'Job Titles' })).toBeVisible();
            await expect(jobTitlesPage.rows.filter({ hasText: jobTitle })).toContainText(jobTitle);
            await expect(jobTitlesPage.rows.filter({ hasText: jobTitle })).toContainText(jobDescription);
        } finally {
            await jobTitleService.deleteJobTitleAndExpect(jobTitleId);
        }

    });

    async function interceptJobTitleId(page: Page): Promise<number> {
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
});

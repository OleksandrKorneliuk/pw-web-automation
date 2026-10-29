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

    test('Create a new job title with valid data', async ({ page, jobTitlesPage, addJobTitlesPage }) => {
        const apiContext = await createApiContext();
        const jobTitleService = new JobTitlesService(apiContext);

        const jobTitle = `Automation QA Engineer ${Date.now()}`;
        const jobDescription = `Created via Playwright automation ${Date.now()}`;

        await addJobTitlesPage.goto();

        await addJobTitlesPage.jobTitleInput.fill(jobTitle);
        await addJobTitlesPage.jobDescriptionTextarea.fill(jobDescription);
        await addJobTitlesPage.saveButton.click();

        const jobTitleId = await jobTitleService.interceptJobTitleId(page);

        try {
            await expect(page).toHaveURL(jobTitlesPage.url);
            await expect(jobTitlesPage.pageHeader).toBeVisible();
            await expect(jobTitlesPage.rows.filter({ hasText: jobTitle })).toContainText(jobTitle);
            await expect(jobTitlesPage.rows.filter({ hasText: jobTitle })).toContainText(jobDescription);
        } finally {
            await jobTitleService.deleteJobTitleAndExpect(jobTitleId);
        }
    });

    test('Attempt to create a new job title with invalid or missing required data', async ({ addJobTitlesPage, page }) => {
        await addJobTitlesPage.goto();

        await addJobTitlesPage.saveButton.click();

        await expect(addJobTitlesPage.requiredFieldErrorMessage).toBeVisible();
        await expect(page).toHaveURL(/saveJobTitle/);

        await addJobTitlesPage.jobTitleInput.fill('');
        await addJobTitlesPage.saveButton.click();

        await expect(addJobTitlesPage.requiredFieldErrorMessage).toBeVisible();
        await expect(addJobTitlesPage.jobTitleInput).toHaveValue('');
    });
});

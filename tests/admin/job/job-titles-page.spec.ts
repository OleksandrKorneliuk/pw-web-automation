// spec: specs/job-titles-plan.md
// seed: tests/seed.spec.ts

import { expect } from '@playwright/test';
import { test } from '../../../fixtures/jobTitle';
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

    test('Edit an existing job title', async ({ page, jobTitlesPage, addJobTitlesPage, jobTitle }) => {
        const updatedJobTitle = `Updated Automation QA Engineer ${Date.now()}`;
        const updatedDescription = `Updated via Playwright automation ${Date.now()}`;

        // 1. Open the job titles page
        await jobTitlesPage.goto();

        // 2. Find the pre-created job title and open its edit form
        const row = jobTitlesPage.rows.filter({ hasText: jobTitle.title }).first();
        await expect(row).toBeVisible();
        await row.locator('button').last().click();

        // 3. Verify the edit form is prefilled and update the job title details
        await expect(addJobTitlesPage.jobTitleInput).toHaveValue(jobTitle.title);
        await expect(addJobTitlesPage.jobDescriptionTextarea).toHaveValue(jobTitle.description ?? '');
        await addJobTitlesPage.jobTitleInput.fill(updatedJobTitle);
        await addJobTitlesPage.jobDescriptionTextarea.fill(updatedDescription);

        // 4. Save the changes
        await addJobTitlesPage.saveButton.click();

        // 5. Verify the updated job title appears in the list
        await expect(page).toHaveURL(jobTitlesPage.url);
        await expect(jobTitlesPage.pageHeader).toBeVisible();
        await expect(jobTitlesPage.rows.filter({ hasText: updatedJobTitle })).toContainText(updatedJobTitle);
        await expect(jobTitlesPage.rows.filter({ hasText: updatedJobTitle })).toContainText(updatedDescription);
    });

    test('Delete an existing job title', async ({ page, jobTitlesPage, jobTitle }) => {
        await jobTitlesPage.goto();

        await jobTitlesPage.deleteJobTitleByTitleName(jobTitle.title);

        await expect(jobTitlesPage.successfullyDeletedWarning).toBeVisible();
        await expect(jobTitlesPage.rows.filter({ hasText: jobTitle.title })).toHaveCount(0);
    });
});

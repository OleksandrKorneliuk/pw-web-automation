// spec: specs/job-titles-plan.md
// seed: tests/seed.spec.ts

import { expect } from '@playwright/test';
import { test } from '../../../fixtures/PageManager';

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
});

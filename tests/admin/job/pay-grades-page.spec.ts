// spec: specs/pay-grades-plan.md
// seed: tests/seed.spec.ts

import { expect } from '@playwright/test';
import { test } from '../../../fixtures/admin/job/payGrade';

test.describe('pay-grades', () => {
    test('Page loads and renders the pay grade list', async ({ payGradesPage }) => {
        await payGradesPage.goto();

        await expect(payGradesPage.pageHeader).toBeVisible();

        await expect(payGradesPage.pageHeader).toHaveText('Pay Grades');

        await expect(payGradesPage.addButton).toBeVisible();
        await expect(payGradesPage.addButton).toBeEnabled();

        await expect(payGradesPage.nameColumnHeader).toBeVisible();
        await expect(payGradesPage.currencyColumnHeader).toBeVisible();
        await expect(payGradesPage.actionsColumnHeader).toBeVisible();

        await expect(payGradesPage.recordsSummary).toBeVisible();
        await expect(payGradesPage.dataRows.first()).toBeVisible();
        await expect(payGradesPage.dataRows).not.toHaveCount(0);
    });
});

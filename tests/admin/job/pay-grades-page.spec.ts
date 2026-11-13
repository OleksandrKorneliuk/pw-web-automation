// spec: specs/pay-grades-plan.md
// seed: tests/seed.spec.ts

import { expect } from '@playwright/test';
import { test } from '../../../fixtures/admin/job/payGrade';
import { createApiContext } from '../../../helpers/apiContext.helper';
import { PayGradesService } from '../../../api/services/admin/job/payGradesService';
import { PayGradePage } from '../../../pages/admin/job/pay-grade-page';

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

  test('Add a new pay grade with valid data', async ({ page, payGradesPage, addPayGradePage }) => {
    const apiContext = await createApiContext();
    const payGradesService = new PayGradesService(apiContext);

    const payGradeName = `Automation Pay Grade ${Date.now()}`;

    addPayGradePage.goto();
    await expect(page).toHaveURL(addPayGradePage.url);

    await addPayGradePage.payGradeNameInput.fill(payGradeName);
    await expect(addPayGradePage.payGradeNameInput).toHaveValue(payGradeName);

    await addPayGradePage.saveButton.click();
    const payGradeId = await payGradesService.interceptPayGradeId(page);
    const payGradePage = new PayGradePage(page, payGradeId.toString());

    try {
      await expect(page).toHaveURL(payGradePage.url);
      await expect(payGradePage.heading).toBeVisible();
      payGradesPage.goto();
      await expect(payGradesPage.dataRows.filter({ hasText: payGradeName })).toContainText(payGradeName);
    } finally {
      await payGradesService.deletePayGradeAndExpect(payGradeId);
    }
  });
});

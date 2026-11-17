// spec: specs/pay-grades-plan.md
// seed: tests/seed.spec.ts

import { expect } from '@playwright/test';
import { test } from '../../../fixtures/admin/job/payGrade';
import { createApiContext } from '../../../helpers/apiContext.helper';
import { PayGradesService } from '../../../api/services/admin/job/payGradesService';
import { PayGradePage } from '../../../pages/admin/job/pay-grade-page';

test.describe('pay-grades', () => {
  test('Page loads and renders the pay grade list', async ({ viewPayGradesPage }) => {
    await viewPayGradesPage.goto();

    await expect(viewPayGradesPage.pageHeader).toBeVisible();

    await expect(viewPayGradesPage.pageHeader).toHaveText('Pay Grades');

    await expect(viewPayGradesPage.addButton).toBeVisible();
    await expect(viewPayGradesPage.addButton).toBeEnabled();

    await expect(viewPayGradesPage.nameColumnHeader).toBeVisible();
    await expect(viewPayGradesPage.currencyColumnHeader).toBeVisible();
    await expect(viewPayGradesPage.actionsColumnHeader).toBeVisible();

    await expect(viewPayGradesPage.recordsSummary).toBeVisible();
    await expect(viewPayGradesPage.dataRows.first()).toBeVisible();
    await expect(viewPayGradesPage.dataRows).not.toHaveCount(0);
  });

  test('Add a new pay grade with valid data', async ({ page, viewPayGradesPage, addPayGradePage }) => {
    const apiContext = await createApiContext();
    const payGradesService = new PayGradesService(apiContext);

    const payGradeName = `Automation Pay Grade ${Date.now()}`;

    await addPayGradePage.goto();
    await expect(page).toHaveURL(addPayGradePage.url);

    await addPayGradePage.payGradeNameInput.fill(payGradeName);
    await expect(addPayGradePage.payGradeNameInput).toHaveValue(payGradeName);

    await addPayGradePage.saveButton.click();
    await page.waitForURL(/\/admin\/payGrade\/\d+$/);

    const payGradeIdMatch = page.url().match(/\/admin\/payGrade\/(\d+)$/);
    if (!payGradeIdMatch?.[1]) {
      throw new Error(`Expected pay grade edit URL with ID after save, but got: ${page.url()}`);
    }

    const payGradeId = Number(payGradeIdMatch[1]);
    const payGradePage = new PayGradePage(page, payGradeId.toString());

    try {
      await expect(page).toHaveURL(payGradePage.url);
      await expect(payGradePage.heading).toBeVisible();
      await viewPayGradesPage.goto();
      await expect(viewPayGradesPage.dataRows.filter({ hasText: payGradeName })).toContainText(payGradeName);
    } finally {
      await payGradesService.deletePayGradeAndExpect(payGradeId);
    }
  });
});

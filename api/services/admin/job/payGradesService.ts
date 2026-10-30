import { APIRequestContext, APIResponse, expect, Page } from "@playwright/test";
import { PayGradesApiClient } from "../../../clients/admin/job/payGradesApiClient";
import { PayGrade } from "../../../../models/admin/job/payGrade";

export class PayGradesService {

    private client: PayGradesApiClient;

    constructor(apiContext: APIRequestContext) {
        this.client = new PayGradesApiClient(apiContext);
    }

    async createPayGradeAndExpect(payGrade: PayGrade) {
        const response = await this.client.postPayGrade(payGrade);
        expect(response.status()).toBe(200);
        payGrade.id = await this.getPayGradeId(response);
        return payGrade;
    }

    async getPayGradeId(response: APIResponse) {
        const body = await response.json();
        return body.data.id;
    }

    async deletePayGradeAndExpect(id?: number) {
        if (!id) {
            throw new Error('Pay Grade id is required to delete a pay grade');
        }

        const response = await this.client.deletePayGrade(id);
        expect([200, 204, 404, 401].includes(response.status())).toBeTruthy();
    }

    async interceptPayGradeId(page: Page): Promise<number> {
        const createPayGradeResponse = await page.waitForResponse(
            response => response.url().includes('api/v2/admin/job-titles')
                && response.status() === 200
                && response.request().method() === 'POST',
            { timeout: 10_000 }
        );
        const responseBody = await createPayGradeResponse.json();
        const payGradeId = responseBody.data.id;
        if (payGradeId === undefined) {
            throw new Error('Pay Grade\'s id not found in API response. Response data: ' + JSON.stringify(responseBody.data));
        }

        return payGradeId;
    }
}
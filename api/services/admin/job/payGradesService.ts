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
        const response = await page.waitForResponse(
            response =>
                response.url().includes('api/v2/admin/pay-grades') &&
                response.request().method() === 'POST' &&
                response.status() === 200,
            { timeout: 10_000 }
        );

        const responseBody = await response.json();
        const payGradeId = responseBody.data.id;

        if (payGradeId === undefined) {
            throw new Error(
                `Pay Grade ID not found. Response: ${JSON.stringify(responseBody)}`
            );
        }

        return payGradeId;
    }
}
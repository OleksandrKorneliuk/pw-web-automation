import { BaseApiClient } from "../../baseApiClient";
import { APIRequestContext } from "@playwright/test";
import { PayGrade } from "../../../../models/admin/job/payGrade";

export class PayGradesApiClient extends BaseApiClient {

    private static PAY_GRADES_ENDPOINT = '/admin/pay-grades';

    constructor(apiContext: APIRequestContext) {
        super(apiContext);
    }

    async postPayGrade(payGrade: PayGrade) {
        return await this.post(PayGradesApiClient.PAY_GRADES_ENDPOINT,
            PayGradesApiClient.buildPayGradePayload(payGrade)
        );
    }

    async putPayGrade(id: number, payGrade: PayGrade) {
        return await this.put(`${PayGradesApiClient.PAY_GRADES_ENDPOINT}/${id}`,
            PayGradesApiClient.buildPayGradePayload(payGrade)
        );
    }

    async deletePayGrade(id: number) {
        return await this.delete(PayGradesApiClient.PAY_GRADES_ENDPOINT,
            { "ids": [id] }
        );
    }

    private static buildPayGradePayload(payGrade: PayGrade) {
        return {
            name: payGrade.name
        };
    }
}
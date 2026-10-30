import { BaseApiClient } from "../../baseApiClient";
import { APIRequestContext } from "@playwright/test";
import { PayGrades } from "../../../../models/admin/job/payGrades";

export class PayGradesApiClient extends BaseApiClient {

    private static PAY_GRADES_ENDPOINT = '/admin/pay-grades';

    constructor(apiContext: APIRequestContext) {
        super(apiContext);
    }

    async postPayGrade(payGrade: PayGrades) {
        return await this.post(PayGradesApiClient.PAY_GRADES_ENDPOINT,
            PayGradesApiClient.buildPayGradePayload(payGrade)
        );
    }

    async putPayGrade(id: number, payGrade: PayGrades) {
        return await this.put(`${PayGradesApiClient.PAY_GRADES_ENDPOINT}/${id}`,
            PayGradesApiClient.buildPayGradePayload(payGrade)
        );
    }

    async deletePayGrade(id: number) {
        return await this.delete(PayGradesApiClient.PAY_GRADES_ENDPOINT,
            { "ids": [id] }
        );
    }

    private static buildPayGradePayload(payGrade: PayGrades) {
        return {
            name: payGrade.name
        };
    }
}
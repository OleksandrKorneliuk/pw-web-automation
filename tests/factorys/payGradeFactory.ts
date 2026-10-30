import { PayGrade } from "../../models/admin/job/payGrade";

export async function createRandomPayGrade(): Promise<PayGrade> {
    const payGrade: PayGrade = {
        name: `Automation Pay Grade ${Date.now()}`
    };

    return payGrade;
}
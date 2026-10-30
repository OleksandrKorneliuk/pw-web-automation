import { test as base } from "../../PageManager";
import { PayGrade } from "../../../models/admin/job/payGrade";
import { createApiContext } from "../../../helpers/apiContext.helper";
import { PayGradesService } from "../../../api/services/admin/job/payGradesService";
import { createRandomPayGrade } from "../../../tests/factorys/payGradeFactory";

export const test = base.extend<{ payGrade: PayGrade; }>({
    payGrade: async ({ }, use) => {
        const apiContext = await createApiContext();
        const payGradeService = new PayGradesService(apiContext);
        const randomPayGrade = await createRandomPayGrade();
        const payGrade = await payGradeService.createPayGradeAndExpect(randomPayGrade);

        await use(payGrade);

        await payGradeService.deletePayGradeAndExpect(payGrade.id);
    }
});
import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../basePage";

export class PayGradePage extends BasePage {

    private payGradeId: string;

    readonly heading: Locator = this.page.getByRole('heading', { name: 'Edit Pay Grade' });

    constructor(page: Page, payGradeId?: string) {
        if (!payGradeId) {
            throw new Error('payGradeId is required to construct PayGradePage');
        }

        super(page);
        this.payGradeId = payGradeId;
    }

    get url(): string {
        return `admin/payGrade/${this.payGradeId}`;
    }
}
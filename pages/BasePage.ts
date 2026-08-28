import { Page } from "@playwright/test";

export abstract class BasePage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded'});
    }

    abstract get url(): string;
}
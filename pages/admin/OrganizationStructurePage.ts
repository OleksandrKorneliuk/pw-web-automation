import {Page, Locator} from '@playwright/test'
import { BasePage } from '../BasePage';

export class OrganizationStructurePage extends BasePage {

    constructor(page: Page) {
        super(page)
    }
}
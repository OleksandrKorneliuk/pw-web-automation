import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";
import { Employee } from "../../models/employee";
import { User } from "../../models/user";

export class AddEmployeePage extends BasePage {

    readonly firstNameTextbox: Locator = this.page.getByRole('textbox', { name: 'First Name' });
    readonly lastNameTextbox: Locator = this.page.getByRole('textbox', { name: 'Last Name' });
    readonly userIdTextbox: Locator = this.page.getByRole('textbox').nth(4);
    readonly saveButton: Locator = this.page.getByRole('button', { name: 'Save' });
    readonly successfullySavedWarning: Locator = this.page.getByText('Successfully Saved');
    readonly createLoginDetailsToggle: Locator = this.page.locator('.oxd-switch-input');
    readonly usernameTextbox: Locator = this.page.getByRole('textbox').nth(5);
    readonly passwordInput: Locator = this.page.locator('input[type="password"]');
    readonly passwordTextbox: Locator = this.passwordInput.first();
    readonly confirmPasswordTextbox: Locator = this.passwordInput.nth(1);

    constructor(page: Page) {
        super(page);
    }

    get url(): string {
        return 'pim/addEmployee';
    }

    async fillEmployeeFirstName(firstName: string) {
        await this.firstNameTextbox.fill(firstName);
    }

    async fillEmployeeLastName(lastName: string) {
        await this.lastNameTextbox.fill(lastName);
    }

    async fillEmployeeId(id: string) {
        await this.userIdTextbox.fill(id);
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }

    async createEmployee(employee: Employee) {
        await this.fillEmployeeFirstName(employee.firstName);
        await this.fillEmployeeLastName(employee.lastName);
        await this.fillEmployeeId(employee.id);
        await this.clickSaveButton();
    }

    async createEmployeeWithLoginDetails(employee: Employee, user: User) {
        await this.fillEmployeeFirstName(employee.firstName);
        await this.fillEmployeeLastName(employee.lastName);
        await this.fillEmployeeId(employee.id);
        await this.createLoginDetailsToggle.click();
        await this.usernameTextbox.fill(user.username);
        await this.passwordTextbox.fill(user.password);
        await this.confirmPasswordTextbox.fill(user.password);
        await this.clickSaveButton();
    }
}
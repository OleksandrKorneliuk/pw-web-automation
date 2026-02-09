import { Page } from "@playwright/test";
import { NavigationBar } from "../../pages/components/navigationBar";
import { NavigationBarItem } from "../../enums/pages/NavigationBarItem";
import { PimPage } from "../../pages/pim/pimPage";
import { createRandomEmployee } from "../factorys/EmployeeFactory";

export async function addNewEmployeeViaUI(page: Page) {
    const navbar = new NavigationBar(page)
    await navbar.clickOnSection(NavigationBarItem.PIM)
    const pimPage = new PimPage(page)
    const addEmployeePage = await pimPage.navigateToAddEmployeeTab()

    const employee = await createRandomEmployee()

    await addEmployeePage.createEmployee(employee.firstName, employee.lastName, employee.id)

    return employee
}

export async function deleteEmployeeViaUI(page: Page, id: string) {
    const navbar = new NavigationBar(page)
    await navbar.clickOnSection(NavigationBarItem.PIM)
    const pimPage = new PimPage(page);
    const employeeListPage = await pimPage.navigateToEmployeeListTab();
    await employeeListPage.deleteEmployeeById(id)
}
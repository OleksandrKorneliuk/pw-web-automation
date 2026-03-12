import { Gender } from "../enums/pages/myInfo/genders";
import { EmployeeData } from "../models/employeeData";

export const validEmployee: EmployeeData = {
    firstName: 'John',
    lastName: 'Smith',
    driversLicenseNumber: 'B1234567',
    nationality: 'North Korean',
    gender: Gender.MALE
}
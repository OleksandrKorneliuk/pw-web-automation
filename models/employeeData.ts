import { Gender } from "../enums/pages/myInfo/genders"

export interface EmployeeData {
    firstName: string
    lastName: string
    driversLicenseNumber: string
    nationality: string
    gender: Gender
}
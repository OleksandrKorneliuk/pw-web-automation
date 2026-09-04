import { Gender } from "../enums/pages/myInfo/genders"

export type Employee = {
    firstName: string
    lastName: string
    id: string
    driverLicenseNumber: string
    number?: number
    nationality: string
    gender: Gender
}
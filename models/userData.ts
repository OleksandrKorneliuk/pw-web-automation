import { UserRole } from "../enums/userRole"

export type UserData = {
    username: string
    password: string
    isEnabled: boolean
    userRoleId: UserRole
    empNumber: number
}
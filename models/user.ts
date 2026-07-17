import { UserRole } from "../enums/userRole"

export type User = {
    username: string
    password: string
    isEnabled: boolean
    userRoleId: UserRole
    id: string
}
import { validationResponse } from "../../../types"
import { Admins } from "../entities/Admins"
import { CreateAdminRequestProps } from "../useCases/createAdmins/CreateAdminController"
import { UpdateAdminRequestProps } from "../useCases/updateAdmins/UpdateAdminsController"
import { UpdateAdminPasswordRequestProps } from "../useCases/updateAdminsPassword/UpdateAdminsPasswordController"


interface IAdminsRepository {

    filterAdmins(
        id: Admins["id"] | undefined,
        name: Admins["name"] | undefined,
        email: Admins["email"] | undefined,
        username: Admins["username"] | undefined,
        actualPage: number
    ): Promise<Admins[] | validationResponse>

    createAdmin(adminData: CreateAdminRequestProps): Promise<Admins | validationResponse>

    updateAdmin(adminData: UpdateAdminRequestProps, adminID: Admins["id"]): Promise<Admins | validationResponse>

    updateAdminPassword(adminData: UpdateAdminPasswordRequestProps, adminID: Admins["id"]): Promise<Admins | validationResponse>

    deleteAdmin(adminID: Admins["id"]): Promise<Admins| validationResponse>

}

export {IAdminsRepository}
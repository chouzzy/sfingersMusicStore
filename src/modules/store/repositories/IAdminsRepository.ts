import { validationResponse } from "../../../types"
import { Admins } from "../entities/Admins"

interface IAdminsRepository {

    createAdmins(username: Admins["username"], password: Admins["password"]): Promise<Admins | validationResponse>

    authenticateAdmin(username: Admins["username"], password: Admins["password"]): Promise<validationResponse>
}

export {IAdminsRepository}
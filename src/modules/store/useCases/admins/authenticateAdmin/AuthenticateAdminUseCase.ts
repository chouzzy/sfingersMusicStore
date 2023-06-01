import { validationResponse } from "../../../../../types";
import { Admins } from "../../../entities/Admins";
import { IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { AuthenticateAdminRequestProps } from "./AuthenticateAdminController";


class AuthenticateAdminUseCase {
    constructor(
        private adminsRepository: IAdminsRepository) {}

    async execute(adminData: AuthenticateAdminRequestProps): Promise<Admins | validationResponse> {
        
        const authenticatedAdmin = await this.adminsRepository.authenticateAdmin(adminData.username, adminData.password)
        
        return authenticatedAdmin
    }
    
}

export {AuthenticateAdminUseCase}
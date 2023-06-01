import { validationResponse } from "../../../../../types";
import { Admins } from "../../../entities/Admins";
import { IAdminsRepository } from "../../../repositories/IAdminsRepository";
import { CreateAdminRequestProps } from "./CreateAdminController";


class CreateAdminUseCase {
    constructor(
        private adminsRepository: IAdminsRepository) {}

    async execute(adminData: CreateAdminRequestProps): Promise<Admins | validationResponse> {
        
        const createdAdmin = await this.adminsRepository.createAdmins(adminData.username, adminData.password)
        
        return createdAdmin
    }
    
}

export {CreateAdminUseCase}
import { validationResponse } from "../../../../types";
import { Admins } from "../../entities/Clients";
import { IAdminsRepository } from "../../repositories/IClientsRepository";
import { UpdateAdminRequestProps } from "./UpdateAdminsController";

class UpdateAdminsUseCase {
    constructor(
        private adminsRepository: IAdminsRepository) {}

    async execute(adminData: UpdateAdminRequestProps, adminID: Admins["id"]): Promise<Admins | validationResponse> {
        
        const upatedAdmin = await this.adminsRepository.updateAdmin(adminData, adminID)
        
        return upatedAdmin
    }
    
}

export {UpdateAdminsUseCase}
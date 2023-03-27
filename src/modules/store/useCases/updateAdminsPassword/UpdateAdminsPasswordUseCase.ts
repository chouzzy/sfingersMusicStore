import { validationResponse } from "../../../../types";
import { Admins } from "../../entities/Clients";
import { IAdminsRepository } from "../../repositories/IClientsRepository";
import { UpdateAdminPasswordRequestProps } from "./UpdateAdminsPasswordController";

class UpdateAdminsPasswordUseCase {
    constructor(
        private adminsRepository: IAdminsRepository) {}

    async execute(adminData: UpdateAdminPasswordRequestProps, adminID: Admins["id"]): Promise<Admins | validationResponse> {
        
        const upatedAdmin = await this.adminsRepository.updateAdminPassword(adminData, adminID)
        
        return upatedAdmin
    }
    
}

export {UpdateAdminsPasswordUseCase}
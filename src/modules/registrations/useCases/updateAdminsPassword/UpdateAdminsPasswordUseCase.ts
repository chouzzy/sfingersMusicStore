import { validationResponse } from "../../../../types";
import { Admins } from "../../entities/Admins";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";
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
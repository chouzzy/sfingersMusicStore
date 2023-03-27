import { validationResponse } from "../../../../types";
import { Admins } from "../../entities/Clients";
import { IAdminsRepository } from "../../repositories/IClientsRepository";

class DeleteAdminUseCase {
    constructor(
        private adminsRepository: IAdminsRepository) {}

    async execute(adminID:Admins["id"]): Promise<Admins | validationResponse> {
        
        const deletedAdmin = await this.adminsRepository.deleteAdmin(adminID)
        
        return deletedAdmin
    }
    
}

export {DeleteAdminUseCase}
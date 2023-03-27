import { validationResponse } from "../../../../types";
import { Admins } from "../../entities/Clients";
import { Students } from "../../entities/Products";
import { IAdminsRepository } from "../../repositories/IClientsRepository";
import { IStudentsRepository } from "../../repositories/IProductsRepository";
import { CreateAdminRequestProps } from "./CreateAdminController";


class CreateAdminUseCase {
    constructor(
        private adminsRepository: IAdminsRepository) {}

    async execute(adminData: CreateAdminRequestProps): Promise<Admins | validationResponse> {
        
        const createdAdmin = await this.adminsRepository.createAdmin(adminData)
        
        return createdAdmin
    }
    
}

export {CreateAdminUseCase}
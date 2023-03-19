import { validationResponse } from "../../../../types";
import { Admins } from "../../entities/Admins";
import { Students } from "../../entities/Students";
import { IAdminsRepository } from "../../repositories/IAdminsRepository";
import { IStudentsRepository } from "../../repositories/IStudentsRepository";
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
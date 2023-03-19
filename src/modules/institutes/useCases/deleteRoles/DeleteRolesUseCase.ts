import { Roles } from "../../entities/Roles";
import { IRolesRepository, RolesUseCaseProps } from "../../repositories/IRolesRepository";

class DeleteRolesUseCase {
    constructor(
        private rolesRepository: IRolesRepository ) {}

    async execute(id:Roles["id"]): Promise<RolesUseCaseProps> {

        
        const roleResponse = await this.rolesRepository.findByID(id);

        // Testa se o ID fornecido está nos padrões do Prisma (vai retornar um erro do prisma caso contrário)
        if (roleResponse.errorMessage) {
            return {errorMessage: roleResponse.errorMessage, status:500}
        }

        // Testa se o existe o ID da Role no banco de dados
        if (roleResponse.isEmpty===true)  {
            return {errorMessage: `⛔ This role doesn't exist ⛔`, status:403}
        }

        // Testa se o existe o Title da Role no banco de dados

        const roles = await this.rolesRepository.deleteRole(id)
        return roles
    }
}

export {DeleteRolesUseCase}
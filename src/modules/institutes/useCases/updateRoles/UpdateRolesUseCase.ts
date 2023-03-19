import { Roles } from "../../entities/Roles";
import { IRolesRepository, RolesUseCaseProps } from "../../repositories/IRolesRepository";

interface IRequest {
    id: Roles["id"],
    title: Roles["title"]
}

class UpdateRolesUseCase {
    constructor(
        private rolesRepository: IRolesRepository ) {}

    async execute({id, title}: IRequest): Promise<RolesUseCaseProps> {

        // Checa se os atributos obrigatórios foram enviados
        if (title.length < 5) {
            return {
                errorMessage:`⛔ Role title must be at least 5 letters⛔`,
                status:403
            }
        }

        // Testa se o ID fornecido está nos padrões do Prisma (vai retornar um erro do prisma caso contrário)
        const roleResponse = await this.rolesRepository.findByID(id)

        if (roleResponse.errorMessage) {
            return {errorMessage: roleResponse.errorMessage, status:500}
        }

        // Testa se o existe o ID da Role no banco de dados
        if (roleResponse.isEmpty===true)  {
            return {errorMessage: `⛔ This role doesn't exist ⛔`, status:403}
        }

        // Testa se o existe o Title da Role no banco de dados
        const roleTitleAlreadyExists = await this.rolesRepository.findByTitle(title)
        if (roleTitleAlreadyExists===true) {
            return {errorMessage:`⛔ This role title already exists ⛔`, status:403}
        }

        const roles = await this.rolesRepository.updateRole({id, title})
        return roles
    }
}

export {UpdateRolesUseCase}
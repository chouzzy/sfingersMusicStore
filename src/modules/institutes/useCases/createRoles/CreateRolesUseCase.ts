import { inject, injectable } from "tsyringe";
import { Roles } from "../../entities/Roles";
import { IRolesRepository } from "../../repositories/IRolesRepository";

interface RolesProps extends Roles {}
interface RolesUseCaseProps extends Partial<RolesProps> {
    status?: number
    errorMessage?: string
}

class CreateRolesUseCase {
    constructor(
        private rolesRepository: IRolesRepository ) {}

    async execute(title: Roles["title"]): Promise<RolesUseCaseProps> {


        // Checa se os atributos obrigatórios foram enviados
        if (title.length < 5) {
            return {
                errorMessage:`⛔ Role title must be at least 5 letters⛔`,
                status:403
            }
        }


        // Testa se o existe o Title da Role no banco de dados
        const roleTitleAlreadyExists = await this.rolesRepository.findByTitle(title)
        if (roleTitleAlreadyExists===true) {
            return {errorMessage:`⛔ This role title already exists ⛔`, status: 403}
        }

        const roles = await this.rolesRepository.createRole(title)

        return roles
    }
}

export {CreateRolesUseCase}
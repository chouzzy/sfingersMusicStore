import { inject, injectable } from "tsyringe";
import { Roles } from "../../entities/Roles";
import { IRolesRepository, RolesUseCaseProps } from "../../repositories/IRolesRepository";

class ListRolesUseCase {
    constructor(
        private rolesRepository: IRolesRepository ) {}

    async execute(): Promise<RolesUseCaseProps> {
        const roles = await this.rolesRepository.listAll()

        return roles
    }
}

export {ListRolesUseCase}
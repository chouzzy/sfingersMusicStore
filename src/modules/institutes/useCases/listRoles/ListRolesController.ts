import { Request, Response } from "express";
import { container } from "tsyringe";
import { RolesRepository } from "../../repositories/implementations/RolesRepository";
import { ListRolesUseCase } from "./ListRolesUseCase";


class ListRolesController {
    async handle(req: Request, res: Response): Promise<Response> {

        // Instanciando o useCase no repositório com as funções
        const rolesRepository = new RolesRepository()
        const listRolesUseCase = new ListRolesUseCase(rolesRepository);
        
        const rolesList = await listRolesUseCase.execute()

        const responseStatus = rolesList.status? rolesList.status : 202
        return res.status(responseStatus).json({
            host:'Welcome to roles, sir. 👨🏻‍✈️', 
            message: rolesList
        })

    }
}

export {ListRolesController}
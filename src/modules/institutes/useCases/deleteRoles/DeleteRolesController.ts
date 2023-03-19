import { Request, Response } from "express";
import { container } from "tsyringe";
import { Roles } from "../../entities/Roles";
import { RolesRepository } from "../../repositories/implementations/RolesRepository";
import { DeleteRolesUseCase } from "./DeleteRolesUseCase";
// 


class DeleteRolesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const id:Roles["id"] = req.params.id


        // Instanciando o useCase no repositório com as funções
        const rolesRepository = new RolesRepository()
        const deleteRolesUseCase = new DeleteRolesUseCase(rolesRepository)

        // Realizando a tentativa de update (try catch necessário para reportar o tipo do erro na api)
        const rolesList = await deleteRolesUseCase.execute(id)

        const responseStatus = rolesList.status? rolesList.status : 202

        return res.status(responseStatus).json({
            host:'Welcome to roles, sir. 👨🏻‍✈️', 
            message: rolesList
        })
        
        
    }
}

export {DeleteRolesController}
import { Request, Response } from "express";
import { container } from "tsyringe";
import { Roles } from "../../entities/Roles";
import { RolesRepository } from "../../repositories/implementations/RolesRepository";
import { UpdateRolesUseCase } from "./UpdateRolesUseCase";
// 

interface IRequest {
    id: Roles["id"],
    title: Roles["title"]
}

class UpdateRolesController {
    async handle(req: Request, res: Response): Promise<Response> {

        
        const {title}:IRequest = req.body

        const id:IRequest["id"] = req.params.id

        // Instanciando o useCase no repositório com as funções
        const rolesRepository = new RolesRepository()
        const updateRolesUseCase = new UpdateRolesUseCase(rolesRepository)


        // Realizando a tentativa de update (try catch necessário para reportar o tipo do erro na api)
        const rolesList = await updateRolesUseCase.execute({id, title})

        const responseStatus = rolesList.status? rolesList.status : 202
        return res.status(responseStatus).json({
            host:'Welcome to roles, sir. 👨🏻‍✈️', 
            message: rolesList
        })
        
        
    }
}

export {UpdateRolesController}
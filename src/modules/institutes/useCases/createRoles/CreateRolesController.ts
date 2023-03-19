import { Request, Response } from "express";
import { container } from "tsyringe";
import { Roles } from "../../entities/Roles";
import { RolesRepository } from "../../repositories/implementations/RolesRepository";
import { CreateRolesUseCase } from "./CreateRolesUseCase";


interface IRequest {
    title: Roles["title"]
}


class CreateRolesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const {title}:IRequest = req.body

        // Instanciando o useCase no repositório com as funções
        const rolesRepository = new RolesRepository()
        const createRolesUseCase = new CreateRolesUseCase(rolesRepository);
        
        const rolesList = await createRolesUseCase.execute(title)

        const responseStatus = rolesList.status? rolesList.status : 202
        return res.status(responseStatus).json({
            host:'Welcome to roles, sir. 👨🏻‍✈️', 
            message: rolesList
        })

    }
}

export {CreateRolesController}
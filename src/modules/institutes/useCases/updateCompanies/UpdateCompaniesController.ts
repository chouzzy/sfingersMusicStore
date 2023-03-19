import { Request, Response } from "express";
import { Companies } from "../../entities/Companies";
import { CompaniesRepository } from "../../repositories/implementations/CompaniesRepository";
import { UpdateCompaniesUseCase } from "./UpdateCompaniesUseCase";
// 

interface IRequest {
    name: Companies["name"]
    id: Companies["id"]
}


class UpdateCompaniesController {
    async handle(req: Request, res: Response): Promise<Response> {

        const {name}:IRequest = req.body

        const id:IRequest["id"] = req.params.id


        // Instanciando o useCase no repositório com as funções
        const companiesRepository = new CompaniesRepository()
        
        const updateCompaniesUseCase = new UpdateCompaniesUseCase(companiesRepository);

        // Realizando a tentativa de update (try catch necessário para reportar o tipo do erro na api)
        const companiesList = await updateCompaniesUseCase.execute({id, name})

        const responseStatus = companiesList.status? companiesList.status : 202
        return res.status(responseStatus).json({
            host:'Welcome to companies, sir. 👨🏻‍✈️', 
            message: companiesList
        })
        
        
    }
}

export {UpdateCompaniesController}
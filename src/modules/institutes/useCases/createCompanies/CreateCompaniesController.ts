import { Request, Response } from "express";
import { container } from "tsyringe";
import { Companies } from "../../entities/Companies";
import { CompaniesRepository } from "../../repositories/implementations/CompaniesRepository";
import { CreateCompaniesUseCase } from "./CreateCompaniesUseCase";

interface IRequest {
    name: Companies["name"],
    teams: Array<string>
}

class CreateCompaniesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const {name, teams}:IRequest = req.body

        // Instanciando o useCase no repositório com as funções
        const companiesRepository = new CompaniesRepository()
        const createCompaniesUseCase = new CreateCompaniesUseCase(companiesRepository);
        
        const companiesList = await createCompaniesUseCase.execute({name})

        const responseStatus = companiesList.status? companiesList.status : 202
        return res.status(responseStatus).json({
            host:'Welcome to companies, sir. 👨🏻‍✈️', 
            message: companiesList
        })

    }
}

export {CreateCompaniesController}
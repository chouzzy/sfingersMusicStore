import { Request, Response } from "express";
import { CompaniesRepository } from "../../repositories/implementations/CompaniesRepository";
import { ListCompaniesUseCase } from "./ListCompaniesUseCase";


class ListCompaniesController {
    async handle(req: Request, res: Response): Promise<Response> {

        // Instanciando o useCase no repositório com as funções
        const companiesRepository = new CompaniesRepository()
        
        const listCompaniesUseCase = new ListCompaniesUseCase(companiesRepository);
        
        const companiesList = await listCompaniesUseCase.execute()

        
        const responseStatus = companiesList.status? companiesList.status : 202

        return res.status(responseStatus).json({
            host:'Welcome to companies, sir. 👨🏻‍✈️', 
            message: companiesList
        })

    }
}

export {ListCompaniesController}
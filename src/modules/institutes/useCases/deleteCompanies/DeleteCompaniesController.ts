import { Request, Response } from "express";
import { Companies } from "../../entities/Companies";
import { CompaniesRepository } from "../../repositories/implementations/CompaniesRepository";
import { DeleteCompaniesUseCase } from "./DeleteCompaniesUseCase";
// 


class DeleteCompaniesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const id:Companies["id"] = req.params.id

        // Instanciando o useCase no repositório com as funções
        const companiesRepository = new CompaniesRepository()
        const deleteCompaniesUseCase = new DeleteCompaniesUseCase(companiesRepository);

        // Realizando a tentativa de update (try catch necessário para reportar o tipo do erro na api)
        const deleteCompanyMessage = await deleteCompaniesUseCase.execute(id)

        if (deleteCompanyMessage.errorMessage) {
            return res.status(403).json({errorMessage:deleteCompanyMessage.errorMessage})
        }

        return res.json({
            host:'Welcome to companies, sir. 👨🏻‍✈️', 
            success: deleteCompanyMessage.success
        })
        
        
    }
}

export {DeleteCompaniesController}
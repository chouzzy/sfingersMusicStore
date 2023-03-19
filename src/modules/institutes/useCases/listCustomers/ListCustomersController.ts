import { Request, Response } from "express";
import { Customers } from "../../entities/Customers";
import { CustomersRepository } from "../../repositories/implementations/CustomersRepository";
import { ListCustomersUseCase } from "./ListCustomersUseCase";


class ListCustomersController {
    async handle(req: Request, res: Response): Promise<Response> {
        const companyID:Customers["company_id"] = req.params.id

        // Instanciando o useCase no repositório com as funções
        const customersRepository = new CustomersRepository()
        const listCustomersUseCase = new ListCustomersUseCase(customersRepository);
        
        const customersList = await listCustomersUseCase.execute(companyID)
    
        const responseStatus = customersList.status? customersList.status : 202
        return res.status(responseStatus).json({
            host:'Welcome to customers, sir. 👨🏻‍✈️', 
            message: customersList
        })

    }
}

export {ListCustomersController}
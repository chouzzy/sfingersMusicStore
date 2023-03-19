import { Request, Response } from "express";
import { stringify } from "ts-typed-json";
import { container } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { Customers } from "../../entities/Customers";
import { CustomersRepository } from "../../repositories/implementations/CustomersRepository";
import { DeleteCustomerTeamsUseCase } from "./DeleteCustomerTeamsUseCase";

interface IRequest {
    teamsID: Array<string>
    companyID: Customers["company_id"]
    customerID: Customers["id"]
}

class DeleteCustomerTeamsController {
    async handle(req: Request, res: Response): Promise<Response> {
        
        const {teamsID}:IRequest = req.body
        const companyID:IRequest["companyID"] = req.params.id
        const customerID:IRequest["customerID"] = req.params.customerId
        
        // Instanciando o useCase no repositório com as funções
        const customersRepository = new CustomersRepository()
        const updateCustomerTeamsUseCase = new DeleteCustomerTeamsUseCase(customersRepository);
        
        const customersList = await updateCustomerTeamsUseCase.execute({companyID, customerID, teamsID})
        
        const responseStatus = customersList.status? customersList.status : 202
        return res.status(responseStatus).json({
            host:'Welcome to customers, sir. 👨🏻‍✈️', 
            message: customersList
        })

    }
}

export {DeleteCustomerTeamsController}
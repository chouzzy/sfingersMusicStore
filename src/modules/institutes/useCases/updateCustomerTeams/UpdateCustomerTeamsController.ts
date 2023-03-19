import { Request, Response } from "express";
import { Customers } from "../../entities/Customers";
import { CustomersRepository } from "../../repositories/implementations/CustomersRepository";
import { UpdateCustomerTeamsUseCase } from "./UpdateCustomerTeamsUseCase";


interface IRequest {
    companyID:Customers["company_id"],
    customerID:Customers["id"]
    teamNames:Array<string>,
}

class UpdateCustomerTeamsController {

    async handle(req: Request, res: Response): Promise<Response> {
        
        const {teamNames}:IRequest = req.body

        const companyID:IRequest["companyID"] = req.params.id

        const customerID:IRequest["customerID"] = req.params.customerId


        // Instanciando o useCase no repositório com as funções
        const customersRepository = new CustomersRepository()

        const updateCustomerTeamsUseCase = new UpdateCustomerTeamsUseCase(customersRepository);
        
        const customersList = await updateCustomerTeamsUseCase.execute({companyID, customerID, teamNames})
        


        const responseStatus = customersList.status? customersList.status : 202

        return res.status(responseStatus).json({
            host:'Welcome to customers, sir. 👨🏻‍✈️', 
            message: customersList
        })

    }
}

export {UpdateCustomerTeamsController}
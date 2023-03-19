import { Request, Response } from "express";
import { container } from "tsyringe";
import { Customers } from "../../entities/Customers";
import { CustomersRepository } from "../../repositories/implementations/CustomersRepository";
import { UpdateCustomersUseCase } from "./UpdateCustomersUseCase";

interface IRequest {
    companyID:Customers["company_id"],
    customerID:Customers["id"]
    name:Customers["name"],
}


class UpdateCustomersController {
    async handle(req: Request, res: Response): Promise<Response> {

        const {name}:IRequest = req.body
        const companyID:IRequest["companyID"] = req.params.id
        const customerID:IRequest["customerID"] = req.params.customerId


        // Instanciando o useCase no repositório com as funções
        const customersRepository = new CustomersRepository()

        const updateCustomersUseCase = new UpdateCustomersUseCase(customersRepository);

        const customersList = await updateCustomersUseCase.execute({companyID, customerID, name})
        

        const responseStatus = customersList.status? customersList.status : 202

        return res.status(responseStatus).json({
            host:'Welcome to customers, sir. 👨🏻‍✈️', 
            message: customersList
        })

    }
}

export {UpdateCustomersController}
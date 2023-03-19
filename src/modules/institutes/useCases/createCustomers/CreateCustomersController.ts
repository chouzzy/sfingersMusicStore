import { Request, Response } from "express";
import { container } from "tsyringe";
import { Customers } from "../../entities/Customers";
import { CustomersRepository } from "../../repositories/implementations/CustomersRepository";
import { CreateCustomersUseCase } from "./CreateCustomersUseCase";

interface IRequestBody {
    name: Customers["name"],
    teamsNames:Array<string>
}

class CreateCustomersController {
    async handle(req: Request, res: Response): Promise<Response> {
        
        const {name, teamsNames}:IRequestBody = req.body
        const company_id:Customers["company_id"] = req.params.id

        // Instanciando o useCase no repositório com as funções
        const customersRepository = new CustomersRepository()
        const createCustomersUseCase = new CreateCustomersUseCase(customersRepository);
            const customersList = await createCustomersUseCase.execute({company_id, name} , teamsNames)
        
        
        const responseStatus = customersList.status? customersList.status : 202
        return res.status(responseStatus).json({
            host:'Welcome to customers, sir. 👨🏻‍✈️', 
            message: customersList
        })

    }
}

export {CreateCustomersController}
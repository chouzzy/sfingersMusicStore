import { Request, Response } from "express";
import { Clients } from "../../../entities/Clients";
import { ClientsRepository} from "../../../repositories/implementations/ClientsRepository";
import { checkQuery, ErrorValidation } from "./ListClientsCheck";
import { ListClientsUseCase } from "./ListClientsUseCase";

interface ListClientsQuery {
    id?: Clients["id"],
    name?: Clients["name"],
    email?: Clients["email"],
}

class ListClientsController {
    async handle(req: Request, res: Response): Promise<Response> {

        const query: ListClientsQuery = req.query

        const queryValidation = await checkQuery(query)

        if (queryValidation.isValid === false) {
            return res.status(queryValidation.statusCode).json({
                errorMessage: queryValidation.errorMessage
            })
        }

        // Instanciando o useCase no repositório com as funções
        const clientsRepository = new ClientsRepository()

        const listClientsUseCase = new ListClientsUseCase(clientsRepository);

        const clients = await listClientsUseCase.execute(query)
        
        const clientsAreValid = await ErrorValidation(clients)
        
        if (clientsAreValid.isValid === false) {
            return res.status(clientsAreValid.statusCode).json({
                errorMessage: clientsAreValid.errorMessage
            })
        }

        return res.status(202).json({
            clients
        })

    }
}

export { ListClientsController, ListClientsQuery }
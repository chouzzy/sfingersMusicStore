import { Request, Response } from "express"
import { Clients } from "../../../entities/Clients"
import { checkBody, ErrorValidation } from "./CreateClientsCheck"
import { CreateClientUseCase } from "./CreateClientsUseCase"
import { ClientsRepository } from "../../../repositories/implementations/ClientsRepository"

interface CreateClientRequestProps {

    name: Clients["name"],
    email: Clients["email"],
    address: Clients["address"],
}

class CreateClientsController {
    async handle(req: Request, res: Response): Promise<Response> {

        const clientData: CreateClientRequestProps = req.body

        /// é responsabilidade do controller validar os dados recebidos na requisição
        const bodyValidation = await checkBody(clientData)

        if (bodyValidation.isValid === false) {
            return res.status(bodyValidation.statusCode).json({
                errorMessage: bodyValidation.errorMessage
            })
        }

        /// instanciação da classe do caso de uso
        const clientsRepository = new ClientsRepository()
        const createClientUseCase = new CreateClientUseCase(clientsRepository)
        const createdClient = await createClientUseCase.execute(clientData)

        ///
        const createdClientIsValid = await ErrorValidation(createdClient)

        if (createdClientIsValid.isValid === false) {
            return res.status(createdClientIsValid.statusCode).json({
                errorMessage: createdClientIsValid.errorMessage
            })
        }

        return res.status(202).json({
            createdClient
        })

    }
}

export { CreateClientsController, CreateClientRequestProps }
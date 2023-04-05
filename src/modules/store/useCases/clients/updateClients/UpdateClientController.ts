import { Request, Response } from "express"
import { checkBody, ErrorValidation } from "./UpdateClientCheck"
import { ClientsRepository } from "../../../repositories/implementations/ClientsRepository"
import { Clients } from "../../../entities/Clients"
import { UpdateClientsUseCase } from "./UpdateClientUseCase"

interface UpdateClientRequestProps {

    name: Clients["name"],
    email: Clients["email"],
    address: Clients["address"],
}

class UpdateClientsController {

    async handle(req: Request, res: Response): Promise<Response> {

        const clientData: UpdateClientRequestProps = req.body
        const {clientID} = req.params

        /// é responsabilidade do controller validar os dados recebidos na requisição
        const bodyValidation = await checkBody(clientData)

        if (bodyValidation.isValid === false) {
            return res.status(bodyValidation.statusCode).json({
                errorMessage: bodyValidation.errorMessage
            })
        }

        /// instanciação da classe do caso de uso
        const clientsRepository = new ClientsRepository()
        const updateClientsUseCase = new UpdateClientsUseCase(clientsRepository)
        const updatedClient = await updateClientsUseCase.execute(clientData, clientID)

        ///
        const updatedClientIsValid = await ErrorValidation(updatedClient)

        if (updatedClientIsValid.isValid === false) {
            return res.status(updatedClientIsValid.statusCode).json({
                errorMessage: updatedClientIsValid.errorMessage
            })
        }

        return res.status(202).json({
            updatedClient
        })

    }
}

export { UpdateClientsController, UpdateClientRequestProps }
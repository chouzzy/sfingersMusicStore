import { Request, Response } from "express"
import { Clients } from "../../../entities/Clients"
import { ClientsRepository } from "../../../repositories/implementations/ClientsRepository"
import { ErrorValidation } from "./DeleteClientCheck"
import { DeleteClientUseCase } from "./DeleteClientUseCase"

class DeleteClientController {
    async handle(req: Request, res: Response): Promise<Response> {

        const clientID:Clients["id"] = req.params.clientID

        const clientsRepository = new ClientsRepository()
        const deleteClientUseCase = new DeleteClientUseCase(clientsRepository)
        const deletedClient = await deleteClientUseCase.execute(clientID)

        const deletedClientIsValid = await ErrorValidation(deletedClient)

        if (deletedClientIsValid.isValid === false) {
            return res.status(deletedClientIsValid.statusCode).json({
                errorMessage: deletedClientIsValid.errorMessage
            })
        }

        return res.status(202).json({
            deletedClient
        })

    }
}

export {DeleteClientController}
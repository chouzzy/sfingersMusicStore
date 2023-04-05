import { validationResponse } from "../../../types"
import { Clients } from "../entities/Clients"
import { CreateClientRequestProps } from "../useCases/clients/createClients/CreateClientsController"
import { UpdateClientRequestProps } from "../useCases/clients/updateClients/UpdateClientController"

interface IClientsRepository {

    filterClients(
        id: Clients["id"] | undefined,
        name: Clients["name"] | undefined,
        email: Clients["email"] | undefined
    ): Promise<Clients[] | validationResponse>

    createClient(clientData: CreateClientRequestProps): Promise<Clients | validationResponse>

    updateClient(clientData: UpdateClientRequestProps, clientID: Clients["id"]): Promise<Clients | validationResponse>

    deleteClient(clientID: Clients["id"]): Promise<Clients| validationResponse>

}

export {IClientsRepository}
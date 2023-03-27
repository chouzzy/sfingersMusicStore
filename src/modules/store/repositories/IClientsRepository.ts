import { validationResponse } from "../../../types"
import { Clients } from "../entities/Clients"

interface IClientsRepository {

    filterClients(
        id: Clients["id"] | undefined,
        name: Clients["name"] | undefined,
        email: Clients["email"] | undefined,
        address: Clients["address"] | undefined,
        actualPage: number
    ): Promise<Clients[] | validationResponse>

    createClient(clientData: CreateClientRequestProps): Promise<Clients | validationResponse>

    updateClient(clientData: UpdateClientRequestProps, clientID: Clients["id"]): Promise<Clients | validationResponse>

    deleteClient(clientID: Clients["id"]): Promise<Clients| validationResponse>

}

export {IClientsRepository}d
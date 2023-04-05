import { IClientsRepository } from "../../../repositories/IClientsRepository"
import { ListClientsQuery } from "./ListClientsController"
import { validationResponse } from "../../../../../types"
import { Clients } from "../../../entities/Clients"
//////

class ListClientsUseCase {
    constructor(
        private clientsRepository: IClientsRepository) { }

    async execute(query: ListClientsQuery): Promise<Clients[] | validationResponse> {

        let {
            id,
            name,
            email,
        } = query


        const clients = await this.clientsRepository.filterClients(
            id,
            name,
            email,
        )
        
        return clients
    }
}

export { ListClientsUseCase }

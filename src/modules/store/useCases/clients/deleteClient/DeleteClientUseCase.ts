import { validationResponse } from "../../../../../types";
import { Clients } from "../../../entities/Clients";
import { IClientsRepository } from "../../../repositories/IClientsRepository";

class DeleteClientUseCase {
    constructor(
        private clientsRepository: IClientsRepository) {}

    async execute(clientID:Clients["id"]): Promise<Clients | validationResponse> {
        
        const deletedClient = await this.clientsRepository.deleteClient(clientID)
        
        return deletedClient
    }
    
}

export {DeleteClientUseCase}
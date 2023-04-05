import { validationResponse } from "../../../../../types";
import { Clients } from "../../../entities/Clients";
import { IClientsRepository } from "../../../repositories/IClientsRepository";
import { UpdateClientRequestProps } from "./UpdateClientController";

class UpdateClientsUseCase {
    constructor(
        private clientsRepository: IClientsRepository) {}

    async execute(clientData: UpdateClientRequestProps, clientID: Clients["id"]): Promise<Clients | validationResponse> {
        
        const upatedClient = await this.clientsRepository.updateClient(clientData, clientID)
        
        return upatedClient
    }
    
}

export {UpdateClientsUseCase}
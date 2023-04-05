import { validationResponse } from "../../../../../types";
import { Clients } from "../../../entities/Clients";
import { IClientsRepository } from "../../../repositories/IClientsRepository";
import { CreateClientRequestProps } from "./CreateClientsController";


class CreateClientUseCase {
    constructor(
        private clientsRepository: IClientsRepository) {}

    async execute(clientData: CreateClientRequestProps): Promise<Clients | validationResponse> {
        
        const createdClient = await this.clientsRepository.createClient(clientData)
        
        return createdClient
    }
    
}

export {CreateClientUseCase}
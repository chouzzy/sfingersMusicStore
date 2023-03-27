import { validationResponse } from "../../../../types";
import { Donations } from "../../entities/Donations";
import { IDonationsRepository } from "../../repositories/IDonationsRepository";
import { checkBody } from "./CreateDonationCheck";
import { CreateDonationProps } from "./CreateDonationController";


class CreateDonationUseCase {
    constructor(
        private donationsRepository: IDonationsRepository) {}

    async execute(donationData:CreateDonationProps): Promise<Donations | validationResponse> {
        
        const createdDonation = await this.donationsRepository.createDonation(donationData)
        
        return createdDonation
    }
    
}

export {CreateDonationUseCase}
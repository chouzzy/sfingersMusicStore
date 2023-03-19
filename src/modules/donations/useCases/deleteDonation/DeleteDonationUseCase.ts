import { validationResponse } from "../../../../types";
import { Donations } from "../../entities/Donations";
import { IDonationsRepository } from "../../repositories/IDonationsRepository";

class DeleteDonationUseCase {
    constructor(
        private donationsRepository: IDonationsRepository) {}

    async execute(donationID:Donations["id"]): Promise<Donations | validationResponse> {
        
        const deletedDonation = await this.donationsRepository.deleteDonation(donationID)
        
        return deletedDonation
    }
    
}

export {DeleteDonationUseCase}
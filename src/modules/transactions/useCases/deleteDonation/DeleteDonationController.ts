import { Request, Response } from "express"
import { Donations } from "../../entities/Donations"
import { DonationsRepository } from "../../repositories/implementations/DonationsRepository"
import { ErrorValidation } from "./DeleteDonationCheck"
import { DeleteDonationUseCase } from "./DeleteDonationUseCase"

class DeleteDonationController {
    async handle(req: Request, res: Response): Promise<Response> {

        const donationID:Donations["id"] = req.params.donationID

        const donationsRepository = new DonationsRepository()
        const deleteDonationUseCase = new DeleteDonationUseCase(donationsRepository)
        const deletedDonation = await deleteDonationUseCase.execute(donationID)

        const deletedDonationIsValid = await ErrorValidation(deletedDonation)

        if (deletedDonationIsValid.isValid === false) {
            return res.status(deletedDonationIsValid.statusCode).json({
                errorMessage: deletedDonationIsValid.errorMessage
            })
        }

        return res.status(202).json({
            deletedDonation
        })

    }
}

export {DeleteDonationController}
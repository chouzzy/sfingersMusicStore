import { Request, Response } from "express"
import { Donations } from "../../entities/Donations"
import { DonationsRepository } from "../../repositories/implementations/DonationsRepository"
import { checkBody, ErrorValidation } from "./CreateDonationCheck"
import { CreateDonationUseCase } from "./CreateDonationUseCase"

interface CreateDonationProps {
    name:        Donations["name"]
    email:       Donations["email"]
    phoneNumber: Donations["phoneNumber"]
    gender?:      Donations["gender"]
    birth:       Donations["birth"]
    country:     Donations["country"]
    state:       Donations["state"]
    city:        Donations["city"]
    address:     Donations["address"]
    cpf:         Donations["cpf"]
    rg:          Donations["rg"]
    valuePaid:   Donations["valuePaid"]
}


class CreateDonationController {
    async handle(req: Request, res: Response): Promise<Response> {

        const donationData:CreateDonationProps = req.body

        //é responsabilidade do controller validar os dados recebidos na requisição
        const bodyValidation = await checkBody(donationData)

        if (bodyValidation.isValid === false) {
            return res.status(bodyValidation.statusCode).json({
                errorMessage: bodyValidation.errorMessage
            })
        }


        const donationsRepository = new DonationsRepository()
        const createDonationUseCase = new CreateDonationUseCase(donationsRepository)
        
        const createdDonation = await createDonationUseCase.execute(donationData)
        const createdDonationIsValid = await ErrorValidation(createdDonation)

        if (createdDonationIsValid.isValid === false) {
            return res.status(createdDonationIsValid.statusCode).json({
                errorMessage: createdDonationIsValid.errorMessage
            })
        }

        return res.status(202).json({
            createdDonation
        })

    }
}

export {CreateDonationController, CreateDonationProps}
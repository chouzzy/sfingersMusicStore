import { Request, Response } from "express";
import { DonationsRepository } from "../../repositories/implementations/DonationsRepository";
import { checkQuery } from "./ListDonationsCheck";
import { ListDonationsUseCase } from "./ListDonationsUseCase";

interface ListDonationsQuery {
    initValue?: number,
    endValue?: number,
    email?: string,
    date?: string,
    page?: string
}

class ListDonationsController {
    async handle(req: Request, res: Response): Promise<Response> {

        const query:ListDonationsQuery = req.query

        const queryValidation = await checkQuery(query)
        
        if (queryValidation.isValid === false) {
            return res.status(queryValidation.statusCode).json({
                errorMessage: queryValidation.errorMessage
            })
        }

        // Instanciando o useCase no repositório com as funções
        const donationsRepository = new DonationsRepository()
        
        const listDonationsUseCase = new ListDonationsUseCase(donationsRepository);
        
        const donations = await listDonationsUseCase.execute(query)

        if (donations.length == 0) {
            return res.status(404).json({
                errorMessage: "🛑 Donation not found 🛑"
            })
        }
        
        return res.status(202).json(donations)

    }
}

export {ListDonationsController, ListDonationsQuery}
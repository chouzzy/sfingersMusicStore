import { Request, Response } from "express";
import { TransactionsRepository } from "../../repositories/implementations/TransactionsRepository";
import { ListTransactionsUseCase } from "./ListTransactionsUseCase";

interface ListTransactionsQuery {
}

class ListTransactionsController {
    async handle(req: Request, res: Response): Promise<Response> {
        
        // Instanciando o useCase no repositório com as funções
        const transactionsRepository = new TransactionsRepository()
        
        const listTransactionsUseCase = new ListTransactionsUseCase(transactionsRepository);
        
        const transactions = await listTransactionsUseCase.execute()

        if (transactions.length == 0) {
            return res.status(404).json({
                errorMessage: "🛑 Transaction not found 🛑"
            })
        }
        
        return res.status(202).json(transactions)

    }
}

export {ListTransactionsController, ListTransactionsQuery}
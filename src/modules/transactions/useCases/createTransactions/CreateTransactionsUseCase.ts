import { validationResponse } from "../../../../types";
import { Transactions } from "../../entities/Transactions";
import { ITransactionsRepository } from "../../repositories/ITransactionsRepository";
import { checkBody } from "./CreateTransactionsCheck";
import { CreateTransactionProps } from "./CreateTransactionsController";


class CreateTransactionUseCase {
    constructor(
        private transactionsRepository: ITransactionsRepository) {}

    async execute(transactionData:CreateTransactionProps): Promise<Transactions | validationResponse> {
        
        const createdTransaction = await this.transactionsRepository.createTransaction(transactionData)
        
        return createdTransaction
    }
    
}

export {CreateTransactionUseCase}
import { Transactions } from "../../entities/Transactions"
import { ITransactionsRepository } from "../../repositories/ITransactionsRepository"
//////

class ListTransactionsUseCase {
    constructor(
        private transactionsRepository: ITransactionsRepository) 
        { }
    
    async execute(): Promise<Transactions[]> {

        const transactions = await this.transactionsRepository.listTransactions()
        return transactions
    }
}

export {ListTransactionsUseCase}

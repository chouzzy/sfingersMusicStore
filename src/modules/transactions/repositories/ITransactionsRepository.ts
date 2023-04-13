import { validationResponse } from "../../../types"
import { Transactions } from "../entities/Transactions"
import { CreateTransactionProps } from "../useCases/createTransactions/CreateTransactionsController"


interface ITransactionsRepository {

    listTransactions(): Promise<Transactions[]>

    createTransaction(donationData: CreateTransactionProps): Promise<Transactions|validationResponse>;
}

export {ITransactionsRepository}
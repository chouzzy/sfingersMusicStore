import { Router } from "express"
import { CreateTransactionController } from "../modules/transactions/useCases/createTransactions/CreateTransactionsController"
import { ListTransactionsController } from "../modules/transactions/useCases/listTransactions/ListTransactionsController"

const transactionsRoutes = Router()

const listTransactionsController = new ListTransactionsController()
transactionsRoutes.get('/', listTransactionsController.handle)

const createTransactionController = new CreateTransactionController()
transactionsRoutes.post('/create', createTransactionController.handle)


export {transactionsRoutes}
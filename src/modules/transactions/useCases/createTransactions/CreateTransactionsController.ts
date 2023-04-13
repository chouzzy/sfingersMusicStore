import { Request, Response } from "express"
import { Transactions } from "../../entities/Transactions"
import { TransactionsRepository } from "../../repositories/implementations/TransactionsRepository"
import { checkBody, ErrorValidation } from "./CreateTransactionsCheck"
import { CreateTransactionUseCase } from "./CreateTransactionsUseCase"

interface CreateTransactionProps {
    productID: string
    clientID: string
    quantity: string
}


class CreateTransactionController {
    async handle(req: Request, res: Response): Promise<Response> {

        const transactionData:CreateTransactionProps = req.body

        //é responsabilidade do controller validar os dados recebidos na requisição
        const bodyValidation = await checkBody(transactionData)

        if (bodyValidation.isValid === false) {
            return res.status(bodyValidation.statusCode).json({
                errorMessage: bodyValidation.errorMessage
            })
        }

        const transactionsRepository = new TransactionsRepository()
        const createTransactionUseCase = new CreateTransactionUseCase(transactionsRepository)
        
        const createdTransaction = await createTransactionUseCase.execute(transactionData)
        const createdTransactionIsValid = await ErrorValidation(createdTransaction)

        if (createdTransactionIsValid.isValid === false) {
            return res.status(createdTransactionIsValid.statusCode).json({
                errorMessage: createdTransactionIsValid.errorMessage
            })
        }

        return res.status(202).json({
            createdTransaction
        })

    }
}

export {CreateTransactionController, CreateTransactionProps}
import { Prisma } from "@prisma/client";
import { prisma } from "../../../../prisma";
import { validationResponse } from "../../../../types";
import { Transactions } from "../../entities/Transactions";
import { CreateTransactionProps } from "../../useCases/createTransactions/CreateTransactionsController";
import { ITransactionsRepository } from "../ITransactionsRepository";


class TransactionsRepository implements ITransactionsRepository {

    private transactions: Transactions[]
    constructor() {
        this.transactions = [];
    }

    async listTransactions(): Promise<Transactions[]> {


        const transactions = await prisma.transactions.findMany()
        return transactions

    }



    async createTransaction(transactionData: CreateTransactionProps): Promise<Transactions | validationResponse> {

        try {

            const product = await prisma.products.findFirst({
                where: {
                    id: transactionData.productID
                }
            })
            
            if (!product) {
                return {
                    isValid: false,
                    errorMessage: 'Produto não encontrado',
                    statusCode: 403
                }
            }

            const createdTransaction = await prisma.transactions.create({
                data: {
                    clientID: transactionData.clientID,
                    productID: transactionData.productID,
                    quantity: transactionData.quantity,
                    price: product.price,
                    productName: product.name,

                }
            })

            const quantityBought= Number(transactionData.quantity)
            const quantityInStorage= Number(product.quantity)
            const newQuantity = String(quantityInStorage - quantityBought)

            await prisma.products.update({
                where: {
                    id: transactionData.productID
                },
                data: {
                    quantity: newQuantity,
                }
            })

            return createdTransaction
        }
        catch (error: unknown) {
            if (error instanceof Prisma.PrismaClientValidationError) {

                const argumentPosition = error.message.search('Argument')
                const mongoDBError = error.message.slice(argumentPosition)
                return { isValid: false, errorMessage: mongoDBError, statusCode: 403 }

            } else {
                return { isValid: false, errorMessage: String(error), statusCode: 403 }
            }
        }
    }
}

export { TransactionsRepository }
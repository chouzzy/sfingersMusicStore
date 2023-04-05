import { Request, Response } from "express"
import { Products } from "../../../entities/Products"
import { ProductsRepository } from "../../../repositories/implementations/ProductsRepository"
import { ErrorValidation } from "./DeleteProductCheck"
import { DeleteProductUseCase } from "./DeleteProductUseCase"

class DeleteProductController {
    async handle(req: Request, res: Response): Promise<Response> {

        const productID:Products["id"] = req.params.productID

        const productsRepository = new ProductsRepository()
        const deleteProductUseCase = new DeleteProductUseCase(productsRepository)
        const deletedProduct = await deleteProductUseCase.execute(productID)

        const deletedProductIsValid = await ErrorValidation(deletedProduct)

        if (deletedProductIsValid.isValid === false) {
            return res.status(deletedProductIsValid.statusCode).json({
                errorMessage: deletedProductIsValid.errorMessage
            })
        }

        return res.status(202).json({
            deletedProduct
        })

    }
}

export {DeleteProductController}
import { Request, Response } from "express"
import { Products } from "../../entities/Products"
import { checkBody, ErrorValidation } from "./UpdateProductCheck"
import { ProductsRepository } from "../../repositories/implementations/ProductsRepository"
import { UpdateProductUseCase } from "./UpdateProductUseCase"

interface UpdateProductRequestProps {
    name: Products["name"],
    description: Products["description"],
    color: Products["color"],
    details: Products["details"],
    price: Products["price"],
    quantity: Products["quantity"],
}

class UpdateProductController {

    async handle(req: Request, res: Response): Promise<Response> {

        const productData: UpdateProductRequestProps = req.body
        const {productID} = req.params

        /// é responsabilidade do controller validar os dados recebidos na requisição
        const bodyValidation = await checkBody(productData)

        if (bodyValidation.isValid === false) {
            return res.status(bodyValidation.statusCode).json({
                errorMessage: bodyValidation.errorMessage
            })
        }

        /// instanciação da classe do caso de uso
        const productsRepository = new ProductsRepository()
        const updateProductUseCase = new UpdateProductUseCase(productsRepository)
        const updatedProduct = await updateProductUseCase.execute(productData, productID)

        ///
        const updatedProductIsValid = await ErrorValidation(updatedProduct)

        if (updatedProductIsValid.isValid === false) {
            return res.status(updatedProductIsValid.statusCode).json({
                errorMessage: updatedProductIsValid.errorMessage
            })
        }

        return res.status(202).json({
            updatedProduct
        })

    }
}

export { UpdateProductController, UpdateProductRequestProps }
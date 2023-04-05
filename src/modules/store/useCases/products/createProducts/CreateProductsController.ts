import { Request, Response } from "express"
import { Products } from "../../../entities/Products"
import { checkBody, ErrorValidation } from "./CreateProductsCheck"
import { CreateProductUseCase } from "./CreateProductsUseCase"
import { ProductsRepository } from "../../../repositories/implementations/ProductsRepository"

interface CreateProductRequestProps {
    name: Products["name"],
    description: Products["description"],
    color: Products["color"],
    details: Products["details"],
    price: Products["price"],
    quantity: Products["quantity"],
}

class CreateProductController {
    async handle(req: Request, res: Response): Promise<Response> {

        const productData: CreateProductRequestProps = req.body

        /// é responsabilidade do controller validar os dados recebidos na requisição
        const bodyValidation = await checkBody(productData)

        if (bodyValidation.isValid === false) {
            return res.status(bodyValidation.statusCode).json({
                errorMessage: bodyValidation.errorMessage
            })
        }

        /// instanciação da classe do caso de uso
        const productsRepository = new ProductsRepository()
        const createProductUseCase = new CreateProductUseCase(productsRepository)
        const createdProduct = await createProductUseCase.execute(productData)

        ///
        const createdProductIsValid = await ErrorValidation(createdProduct)

        if (createdProductIsValid.isValid === false) {
            return res.status(createdProductIsValid.statusCode).json({
                errorMessage: createdProductIsValid.errorMessage
            })
        }

        return res.status(202).json({
            createdProduct
        })

    }
}

export { CreateProductController, CreateProductRequestProps }
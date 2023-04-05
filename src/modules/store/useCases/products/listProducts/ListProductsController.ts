import { Request, Response } from "express";
import { Products } from "../../../entities/Products";
import { ProductsRepository} from "../../../repositories/implementations/ProductsRepository";
import { checkQuery, ErrorValidation } from "./ListProductsCheck";
import { ListProductsUseCase } from "./ListProductsUseCase";

interface ListProductsQuery {
    id?: Products["id"],
    name?: Products["name"],
    color?: Products["color"],
    page?: string
}

class ListProductsController {
    async handle(req: Request, res: Response): Promise<Response> {

        const query: ListProductsQuery = req.query

        const queryValidation = await checkQuery(query)

        if (queryValidation.isValid === false) {
            return res.status(queryValidation.statusCode).json({
                errorMessage: queryValidation.errorMessage
            })
        }

        // Instanciando o useCase no repositório com as funções
        const productsRepository = new ProductsRepository()

        const listProductsUseCase = new ListProductsUseCase(productsRepository);

        const products = await listProductsUseCase.execute(query)
        
        const productsAreValid = await ErrorValidation(products)
        
        if (productsAreValid.isValid === false) {
            return res.status(productsAreValid.statusCode).json({
                errorMessage: productsAreValid.errorMessage
            })
        }

        return res.status(202).json({
            products
        })

    }
}

export { ListProductsController, ListProductsQuery }
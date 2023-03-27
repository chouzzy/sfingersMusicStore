import { validationResponse } from "../../../../types"
import { Products } from "../../entities/Products"
import { IProductsRepository } from "../../repositories/IProductsRepository"
import { checkQuery } from "./ListProductsCheck"
import { ListProductsQuery } from "./ListProductsController"
//////

class ListProductsUseCase {
    constructor(
        private productsRepository: IProductsRepository) { }

    async execute(query: ListProductsQuery): Promise<Products[] | validationResponse> {

        let {
            id,
            name,
            color,
            page
        } = query

        let actualPage = Number(page)

        if (page == undefined) { actualPage = 0}


        const products = await this.productsRepository.filterProduct(
            id,
            name,
            color,
            actualPage
        )
        
        return products
    }
}

export { ListProductsUseCase }

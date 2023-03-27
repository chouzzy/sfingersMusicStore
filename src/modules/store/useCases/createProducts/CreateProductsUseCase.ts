import { validationResponse } from "../../../../types";
import { Products } from "../../entities/Products";
import { IProductsRepository } from "../../repositories/IProductsRepository";
import { CreateProductRequestProps } from "./CreateProductsController";


class CreateProductUseCase {
    constructor(
        private productsRepository: IProductsRepository) {}

    async execute(productData: CreateProductRequestProps): Promise<Products | validationResponse> {
        
        const createdProduct = await this.productsRepository.createProduct(productData)
        
        return createdProduct
    }
    
}

export {CreateProductUseCase}
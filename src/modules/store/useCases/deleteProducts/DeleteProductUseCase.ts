import { validationResponse } from "../../../../types";
import { Products } from "../../entities/Products";
import { IProductsRepository } from "../../repositories/IProductsRepository";

class DeleteProductUseCase {
    constructor(
        private productsRepository: IProductsRepository) {}

    async execute(productID:Products["id"]): Promise<Products | validationResponse> {
        
        const deletedProduct = await this.productsRepository.deleteProduct(productID)
        
        return deletedProduct
    }
    
}

export {DeleteProductUseCase}
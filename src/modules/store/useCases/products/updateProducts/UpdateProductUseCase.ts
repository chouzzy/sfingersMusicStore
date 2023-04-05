import { validationResponse } from "../../../../../types";
import { Products } from "../../../entities/Products";
import { IProductsRepository } from "../../../repositories/IProductsRepository";
import { UpdateProductRequestProps } from "./UpdateProductController";

class UpdateProductUseCase {
    constructor(
        private productsRepository: IProductsRepository) {}

    async execute(productData: UpdateProductRequestProps, productID: Products["id"]): Promise<Products | validationResponse> {
        
        const upatedProduct = await this.productsRepository.updateProduct(productData, productID)
        
        return upatedProduct
    }
    
}

export {UpdateProductUseCase}
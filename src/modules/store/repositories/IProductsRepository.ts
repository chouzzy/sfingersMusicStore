import { validationResponse } from "../../../types"
import { Products } from "../entities/Products"
import { CreateProductRequestProps } from "../useCases/createProducts/CreateProductsController"
import { UpdateProductRequestProps } from "../useCases/updateProducts/UpdateProductController"


interface IProductsRepository {

    filterProduct(
        id: Products["id"] | undefined,
        name: Products["name"] | undefined,
        color: Products["color"] | undefined,
        actualPage: number
    ): Promise<Products[] | validationResponse>

    createProduct(productData: CreateProductRequestProps): Promise<Products | validationResponse>

    updateProduct(productData: UpdateProductRequestProps, productID: Products["id"]): Promise<Products | validationResponse>
    
    deleteProduct(productID: Products["id"]): Promise<Products| validationResponse>
}

export {IProductsRepository}
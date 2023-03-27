import { Router } from "express"
import { CreateProductController } from "../modules/store/useCases/createProducts/CreateProductsController"
import { DeleteProductController } from "../modules/store/useCases/deleteProducts/DeleteProductController"
import { ListProductsController } from "../modules/store/useCases/listProducts/ListProductsController"
import { UpdateProductController } from "../modules/store/useCases/updateProducts/UpdateProductController"

const productsRoutes = Router()

const listProductsController = new ListProductsController()
productsRoutes.get('/', listProductsController.handle)

const createProductController = new CreateProductController()
productsRoutes.post('/create', createProductController.handle)

const updateProductController = new UpdateProductController()
productsRoutes.put('/:productID/update', updateProductController.handle)

const deleteProductController = new DeleteProductController()
productsRoutes.delete('/:productID/delete', deleteProductController.handle)


export {productsRoutes}
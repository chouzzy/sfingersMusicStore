import { Prisma } from "@prisma/client";
import { prisma } from "../../../../prisma";
import { validationResponse } from "../../../../types";
import { Products } from "../../entities/Products";
import { CreateProductRequestProps } from "../../useCases/products/createProducts/CreateProductsController";
import { UpdateProductRequestProps } from "../../useCases/products/updateProducts/UpdateProductController";
import { IProductsRepository } from "../IProductsRepository";


class ProductsRepository implements IProductsRepository {

    private products: Products[]
    constructor() {
        this.products = [];
    }

    async filterProduct(
        id: Products["id"] | undefined,
        name: Products["name"] | undefined,
        color: Products["color"] | undefined,
        actualPage: number
    ): Promise<Products[] | validationResponse> {

        if (actualPage == 0) { actualPage = 1 }

        // Função do prisma para buscar todos os products

        try {

            const products = await prisma.products.findMany({
                where: {
                    AND: [
                        { id: id },
                        { name: name },
                        { color: color }
                    ],
                },
            })

            return products
        } catch (error: unknown) {

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return { isValid: false, errorMessage: error, statusCode: 403 }

            } else {
                return { isValid: false, errorMessage: String(error), statusCode: 403 }
            }
        }
    }

    async createProduct(productData: CreateProductRequestProps): Promise<Products | validationResponse> {

        try {
            try {

                const searchedProduct = await prisma.products.findMany({
                    where: { name: productData.name },
                })

                if (searchedProduct[0].name == productData.name) {
                    return { isValid: false, errorMessage: `🛑 Já existe um produto com esse nome 🛑`, statusCode: 403 }
                }
            } catch { }

            const createdProduct = await prisma.products.create({
                data: {
                    name: productData.name,
                    description: productData.description,
                    color: productData.color,
                    details: productData.details,
                    price: productData.price,
                    quantity: productData.quantity
                }
            })

            return createdProduct
        } catch (error: unknown) {
            if (error instanceof Prisma.PrismaClientValidationError) {

                const argumentPosition = error.message.search('Argument')
                const mongoDBError = error.message.slice(argumentPosition)
                return { isValid: false, errorMessage: mongoDBError, statusCode: 403 }

            } else {
                return { isValid: false, errorMessage: String(error), statusCode: 403 }
            }
        }
    }

    async updateProduct(productData: UpdateProductRequestProps, productID: Products["id"]): Promise<Products | validationResponse> {

        try {
            const product = await prisma.products.findUnique({
                where: {
                    id: productID
                }
            })

            if (product == null) {
                return { isValid: false, errorMessage: '🛑 Produto não encontrado 🛑', statusCode: 403 }
            }

            const updatedProduct = await prisma.products.update({
                where: {
                    id: productID
                },
                data: {
                    name: productData.name ?? product.name,
                    description: productData.description ?? product.description,
                    color: productData.color ?? product.color,
                    details: productData.details ?? product.details,
                    price: productData.price ?? product.price,
                    quantity: productData.quantity ?? product.quantity,
                }
            })
            return updatedProduct

        } catch (error: unknown) {

            if (error instanceof Prisma.PrismaClientValidationError) {
                const argumentPosition = error.message.search('Argument')
                const mongoDBError = error.message.slice(argumentPosition)
                return { isValid: false, errorMessage: mongoDBError, statusCode: 403 }
            }

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return { isValid: false, errorMessage: error, statusCode: 403 }
            }

            else {
                return { isValid: false, errorMessage: String(error), statusCode: 403 }
            }
        }
    }

    async deleteProduct(productID: string): Promise<Products | validationResponse> {
        try {

            const product = await prisma.products.findUnique({
                where: {
                    id: productID
                }
            })


            if (product != null) {

                try {

                    await prisma.products.delete({
                        where: {
                            id: productID
                        }
                    })

                    return product

                } catch {

                    return {
                        isValid: false,
                        statusCode: 403,
                        errorMessage: "⛔ Ocorreu um erro ao deletar o produto no banco de dados ⛔"
                    }
                }

            } else {

                return {
                    isValid: false,
                    statusCode: 403,
                    errorMessage: "⛔ Produto não encontrado no banco dados ⛔"
                }
            }

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return { isValid: false, errorMessage: error, statusCode: 403 }

            } else {
                return { isValid: false, errorMessage: String(error), statusCode: 403 }
            }
        }
    }

}

export { ProductsRepository }

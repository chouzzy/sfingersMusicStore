import { prisma } from "../../../../prisma";
import { Prisma } from "@prisma/client";
import { validationResponse } from "../../../../types";
import { Admins } from "../../entities/Admins";
import { IAdminsRepository } from "../IAdminsRepository";


class AdminsRepository implements IAdminsRepository {

    private admins: Admins[]
    constructor() {
        this.admins = [];
    }

    async createAdmins(username: Admins["username"], password: Admins["password"]): Promise<Admins | validationResponse> {

        try {

            const searchedAdmin = await prisma.admins.findFirst({
                where: { username: username },
            })

            if (searchedAdmin) {
                return { isValid: false, errorMessage: `🛑 Admin já cadastrado 🛑`, statusCode: 403 }
            }

            const createdAdmin = await prisma.admins.create({
                data: {
                    username: username,
                    password: password
                }
            })

            return createdAdmin


        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientValidationError) {

                const argumentPosition = error.message.search('Argument')
                const mongoDBError = error.message.slice(argumentPosition)
                return { isValid: false, errorMessage: mongoDBError, statusCode: 403 }

            } else {
                return { isValid: false, errorMessage: String(error), statusCode: 403 }
            }
        }
    }

    async authenticateAdmin(username: Admins["username"], password: Admins["password"]): Promise<validationResponse> {

        try {
            const admin = await prisma.admins.findUnique({
                where: {
                    username: username
                }
            })

            if (!admin) {
                return { isValid: false, errorMessage: '🛑 Admin não encontrado 🛑', statusCode: 404 }
            }

            if (admin.password === password) {
                return { isValid: true, successMessage: 'Login efetuado com sucesso', statusCode: 202 }

            } else {
                return { isValid: false, errorMessage: '🛑 Usuário ou senha incorretos 🛑', statusCode: 401 }
            }

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

}

export { AdminsRepository }

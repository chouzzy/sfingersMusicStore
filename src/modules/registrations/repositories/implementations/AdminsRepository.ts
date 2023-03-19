import { Prisma } from "@prisma/client";
import { prisma } from "../../../../prisma";
import { validationResponse } from "../../../../types";
import { Admins } from "../../entities/Admins";
import { CreateAdminRequestProps } from "../../useCases/createAdmins/CreateAdminController";
import { UpdateAdminRequestProps } from "../../useCases/updateAdmins/UpdateAdminsController";
import { UpdateAdminPasswordRequestProps } from "../../useCases/updateAdminsPassword/UpdateAdminsPasswordController";

import { IAdminsRepository } from "../IAdminsRepository";


class AdminsRepository implements IAdminsRepository {

    private admins: Admins[]
    constructor() {
        this.admins = [];
    }

    async filterAdmins(
        id: Admins["id"] | undefined,
        name: Admins["name"] | undefined,
        email: Admins["email"] | undefined,
        username: Admins["username"] | undefined,
        actualPage: number):
        Promise<validationResponse | Admins[]> {


        if (actualPage == 0) { actualPage = 1 }

        // Função do prisma para buscar todos os admins

        try {

            const admins = await prisma.admins.findMany({
                where: {
                    AND: [
                        { id: id },
                        { name: name },
                        { email: email },
                        { username: username },
                    ],
                },
            })

            return admins
        } catch (error: unknown) {

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return { isValid: false, errorMessage: error, statusCode: 403 }

            } else {
                return { isValid: false, errorMessage: String(error), statusCode: 403 }
            }
        }
    }

    async createAdmin(adminData: CreateAdminRequestProps): Promise<Admins | validationResponse> {

        try {

            const searchedAdmin = await prisma.admins.findMany({
                where: {
                    OR: [
                        { email: adminData.email },
                        { username: adminData.username },
                    ],
                },
            })

            if (searchedAdmin.length > 0) {

                if (searchedAdmin[0].email == adminData.email && searchedAdmin[0].username == adminData.username) {
                    return { isValid: false, errorMessage: `🛑 E-mail and Username already exists 🛑`, statusCode: 403 }
                }

                if (searchedAdmin[0].email == adminData.email) {
                    return { isValid: false, errorMessage: `🛑 E-mail already exists 🛑`, statusCode: 403 }
                }

                if (searchedAdmin[0].username == adminData.username) {
                    return { isValid: false, errorMessage: `🛑 Username already exists 🛑`, statusCode: 403 }
                }


            }

            const createAdmin = await prisma.admins.create({
                data: {
                    name: adminData.name,
                    email: adminData.email,
                    username: adminData.username,
                    password: adminData.password,
                }
            })

            return createAdmin


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

    async updateAdmin(adminData: UpdateAdminRequestProps, adminID: Admins["id"]): Promise<Admins | validationResponse> {

        try {
            const admin = await prisma.admins.findUnique({
                where: {
                    id: adminID
                }
            })

            if (admin == null) {
                return { isValid: false, errorMessage: '🛑 Admin not found 🛑', statusCode: 403 }
            }

            const updatedAdmin = await prisma.admins.update({
                where: {
                    id: adminID
                },
                data: {
                    name: adminData.name ?? admin.name,
                    email: adminData.email ?? admin.email,
                    username: adminData.username ?? admin.username,
                }
            })
            return updatedAdmin

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

    async updateAdminPassword(adminData: UpdateAdminPasswordRequestProps, adminID: string): Promise<Admins | validationResponse> {

        try {
            const admin = await prisma.admins.findUnique({
                where: {
                    id: adminID,
                },
            })

            if (admin == null) {
                return { isValid: false, errorMessage: '🛑 Admin not found 🛑', statusCode: 403 }
            }

            const updatedAdmin = await prisma.admins.update({
                where: {
                    id: adminID
                },
                data: {
                    password: adminData.password ?? admin.password,
                }
            })
            return updatedAdmin

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

    async deleteAdmin(adminID: string): Promise<Admins | validationResponse> {
        try {

            const admin = await prisma.admins.findUnique({
                where: {
                    id: adminID
                }
            })


            if (admin != null) {

                try {

                    await prisma.admins.delete({
                        where: {
                            id: adminID
                        }
                    })

                    return admin

                } catch {

                    return {
                        isValid: false,
                        statusCode: 403,
                        errorMessage: "⛔ An error occurred when trying to delete the admin from the database ⛔"
                    }
                }

            } else {

                return {
                    isValid: false,
                    statusCode: 403,
                    errorMessage: "⛔ Admin not found in database ⛔"
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

export { AdminsRepository }

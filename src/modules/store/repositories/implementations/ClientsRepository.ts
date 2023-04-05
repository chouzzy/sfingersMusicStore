import { Prisma } from "@prisma/client";
import { prisma } from "../../../../prisma";
import { validationResponse } from "../../../../types";
import { Clients } from "../../entities/Clients";
import { CreateClientRequestProps } from "../../useCases/clients/createClients/CreateClientsController";
import { UpdateClientRequestProps } from "../../useCases/clients/updateClients/UpdateClientController";
import { IClientsRepository } from "../IClientsRepository";


class ClientsRepository implements IClientsRepository {

    private clients: Clients[]
    constructor() {
        this.clients = [];
    }

    async filterClients(
        id: Clients["id"] | undefined,
        name: Clients["name"] | undefined,
        email: Clients["email"] | undefined
        ):
        Promise<validationResponse | Clients[]> {

        // Função do prisma para buscar todos os clients

        try {

            const clients = await prisma.clients.findMany({
                where: {
                    AND: [
                        { id: id },
                        { name: name },
                        { email: email },
                    ],
                },
            })

            return clients
        } catch (error: unknown) {

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return { isValid: false, errorMessage: error, statusCode: 403 }

            } else {
                return { isValid: false, errorMessage: String(error), statusCode: 403 }
            }
        }
    }

    async createClient(clientData: CreateClientRequestProps): Promise<Clients | validationResponse> {

        try {

            const searchedClient = await prisma.clients.findMany({
                where: {
                    OR: [
                        { email: clientData.email },
                        { name: clientData.name },
                    ],
                },
            })

            if (searchedClient.length > 0) {

                if (searchedClient[0].email == clientData.email) {
                    return { isValid: false, errorMessage: `🛑 E-mail já cadastrado 🛑`, statusCode: 403 }
                }
            }

            const createClient = await prisma.clients.create({
                data: {
                    name: clientData.name,
                    email: clientData.email,
                    address: clientData.address,
                    
                }
            })

            return createClient


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

    async updateClient(clientData: UpdateClientRequestProps, clientID: Clients["id"]): Promise<Clients | validationResponse> {

        try {
            const client = await prisma.clients.findUnique({
                where: {
                    id: clientID
                }
            })

            if (client == null) {
                return { isValid: false, errorMessage: '🛑 Cliente não encontrado 🛑', statusCode: 403 }
            }

            const updatedClient = await prisma.clients.update({
                where: {
                    id: clientID
                },
                data: {
                    name: clientData.name ?? client.name,
                    email: clientData.email ?? client.email,
                    address: clientData.address ?? client.address,
                }
            })
            return updatedClient

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

    async deleteClient(clientID: string): Promise<Clients | validationResponse> {
        try {

            const client = await prisma.clients.findUnique({
                where: {
                    id: clientID
                }
            })


            if (client != null) {

                try {

                    await prisma.clients.delete({
                        where: {
                            id: clientID
                        }
                    })

                    return client

                } catch {

                    return {
                        isValid: false,
                        statusCode: 403,
                        errorMessage: "⛔ Ocorreu um erro ao deletar o cliente do banco de dados ⛔"
                    }
                }

            } else {

                return {
                    isValid: false,
                    statusCode: 403,
                    errorMessage: "⛔ Client não encontrado no banco de dados ⛔"
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

export { ClientsRepository }

import { Prisma } from "@prisma/client";
import { prisma } from "../../../../prisma";
import { validationResponse } from "../../../../types";
import { Donations } from "../../entities/Donations";
import { CreateDonationProps } from "../../useCases/createDonation/CreateDonationController";
import { IDonationsRepository } from "../IDonationsRepository";


class DonationsRepository implements IDonationsRepository {

    private donations: Donations[]
    constructor() {
        this.donations = [];
    }

    async filterByValueEmailandDate(
        initValue:number,
        endValue:number,
        email:string,
        date:string,
        actualPage:number
    ): Promise<Donations[]> {

        if (actualPage == 0 ) {
            actualPage = 1;
        }
        
        // Função do prisma para buscar todos as donations
        if (email === 'notInformed' && date != 'notInformed') {
    
            const donations = await prisma.donations.groupBy({
                by:[
                    "id",
                    "name",
                    "email",
                    "phoneNumber",
                    "gender",
                    "birth",
                    "country",
                    "state",
                    "city",
                    "address",
                    "cpf",
                    "rg",
                    "valuePaid",
                    "paymentMethod",
                    "paymentStatus",
                    "paymentDate",
                    "createdAt"
                ],
                having: {
                    valuePaid:{
                        gt: initValue,
                        lt: endValue
                    },
                    paymentDate: date,
                    
                },
                
                orderBy: {
                    name: 'asc',
                },
                skip: (actualPage-1)*10,
                take: 10
            })

            return donations
        } 



        else if (email != 'notInformed' && date === 'notInformed') {

            const donations = await prisma.donations.groupBy({
                by:[
                    "id",
                    "name",
                    "email",
                    "phoneNumber",
                    "gender",
                    "birth",
                    "country",
                    "state",
                    "city",
                    "address",
                    "cpf",
                    "rg",
                    "valuePaid",
                    "paymentMethod",
                    "paymentStatus",
                    "paymentDate",
                    "createdAt"
                ],
                having: {
                    valuePaid:{
                        gt: initValue,
                        lt: endValue
                    },
                    email: email
                },
                orderBy: {
                    name: 'asc',
                },
                skip: (actualPage-1)*10,
                take: 10
            })

            return donations
        }



        else if (email != 'notInformed' && date != 'notInformed') {

            const donations = await prisma.donations.groupBy({
                by:[
                    "id",
                    "name",
                    "email",
                    "phoneNumber",
                    "gender",
                    "birth",
                    "country",
                    "state",
                    "city",
                    "address",
                    "cpf",
                    "rg",
                    "valuePaid",
                    "paymentMethod",
                    "paymentStatus",
                    "paymentDate",
                    "createdAt"
                ],
                having: {
                    valuePaid:{
                        gt: initValue,
                        lt: endValue
                    },
                    email: email,
                    paymentDate: date
                },
                orderBy: {
                    name: 'asc',
                },
                skip: (actualPage-1)*10,
                take: 10
            })

            return donations
        }
        
        
        
        else {
            const donations = await prisma.donations.groupBy({
                by:[
                    "id",
                    "name",
                    "email",
                    "phoneNumber",
                    "gender",
                    "birth",
                    "country",
                    "state",
                    "city",
                    "address",
                    "cpf",
                    "rg",
                    "valuePaid",
                    "paymentMethod",
                    "paymentStatus",
                    "paymentDate",
                    "createdAt"
                ],
                having: {
                    valuePaid:{
                        gt: initValue,
                        lt: endValue
                    }
                },
                orderBy: {
                    name: 'asc',
                },
                skip: (actualPage-1)*10,
                take: 10
            })

            return donations
        }
    }

    
    async createDonation(donationData: CreateDonationProps): Promise<Donations | validationResponse> {

        try {
            const createdDonation = await prisma.donations.create({data: {
                name: donationData.name,
                email: donationData.email,
                phoneNumber: donationData.phoneNumber,
                gender: donationData.gender??'Não informado',
                birth: donationData.birth,
                country: donationData.country,
                state: donationData.state,
                city: donationData.city,
                address: donationData.address,
                cpf: donationData.cpf,
                rg: donationData.rg,
                valuePaid: donationData.valuePaid,
                paymentMethod: 'Sem informação ainda',
                paymentStatus: 'Sem informação ainda',
                paymentDate: 'Sem informação ainda',
            }})

            return createdDonation
        }
        catch (error: unknown) {
            if (error instanceof Prisma.PrismaClientValidationError) {

                const argumentPosition = error.message.search('Argument')
                const mongoDBError = error.message.slice(argumentPosition)
                return {isValid: false, errorMessage: mongoDBError, statusCode: 403}
                
            } else {
                return {isValid: false, errorMessage: String(error), statusCode: 403}
            }
        }
    }

    async deleteDonation(donationID: Donations["id"]): Promise<Donations| validationResponse> {
        
        try {

            const donation = await prisma.donations.findUnique({
                where: {
                    id: donationID
                }
            })


            if (donation != null) {
                
                    try {
                        
                        await prisma.donations.delete ({
                            where: {
                                id: donationID
                            }
                        })
                        
                        return donation

                    } catch {

                        return {
                            isValid:false, 
                            statusCode:403 , 
                            errorMessage: "⛔ An error occurred when trying to delete the donation from the database ⛔"
                        }
                    }

            } else {

                    return {
                        isValid:false, 
                        statusCode:403 , 
                        errorMessage: "⛔ Donation not found in database ⛔"
                    }
            }

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return {isValid: false, errorMessage: error, statusCode: 403}
                
            } else {
                return {isValid: false, errorMessage: String(error), statusCode: 403}
            }
        }
    }
}

export {DonationsRepository}
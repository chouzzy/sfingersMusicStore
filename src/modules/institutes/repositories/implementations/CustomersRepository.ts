import { prisma } from "../../../../prisma";
import { Customers } from "../../entities/Customers";
import {v4 as uuidV4} from "uuid";

import {createCustomerDTO, 
        CustomersUseCaseProps,
        ICustomersRepository, 
        updateCustomerDTO,
} from "../ICustomersRepository";

import { checkDuplicatedCustomerTeam } from "../../useCases/updateCustomerTeams/updateCustomerTeamsCheck";
import { deleteDuplicatedCustomerTeams, getDuplicatedCustomerTeamID } from "../../useCases/deleteCustomerTeams/deleteCustomerTeamsCheck";

class CustomersRepository implements ICustomersRepository {
    
    private customers: Customers[]
    constructor() {
        this.customers = []
    }

    //Verifica se existe a company no banco de dados
    async checkIfCompanyExists(company_id:Customers["company_id"]): Promise<Boolean> {

            const company = await prisma.companies.findMany({
                where: { 
                    id: company_id
                }
            })
            if (company.length > 0) {
                return true
            } else {
                return false
            }
    }



    //Lista todos os customers
    async listAllCustomers(): Promise<Customers[]> {
        const customers = await prisma.customers.findMany()
        return customers
    }


    //Lista todos os customers
    async customerExists(id:Customers["id"]): Promise<Boolean> {
        const customer = await prisma.customers.findUnique({
            where: {
                id: id
            }
        })

        if (customer != undefined) {
            return true
        } else {
            return false
        }
    }


    //Lista todos os customers de acordo com o companyID especificado
    async listAllCompanyCustomers(company_id:Customers["company_id"]): Promise<Customers[]> {

        const customers = await prisma.customers.findMany({
            where: {
                company_id: company_id

            }
        })
        return customers
    }

    async createCustomer({company_id, name}:createCustomerDTO, teamsNames:Array<string>): Promise<CustomersUseCaseProps> {
        
        const company = await prisma.companies.findUnique({
            where: {
                id: company_id
            }
        })

        if (company != null && company != undefined) {

            const teams:Customers["teams"] = []
            teamsNames.forEach((name, i) => { 
                teams.push({
                    id: uuidV4(),
                    name: name
                })
            });

            const customers = await prisma.customers.create({
                data: {
                    name:name,
                    company_id:company.id,
                    teams:teams,
                }
            })
            
            return customers 
        } else {
            return {errorMessage: 'Customer not found'}
        }

    }

    
    async updateCustomer({id, name}:updateCustomerDTO): Promise<CustomersUseCaseProps> {
        console.log('name ---------------------------------')
        console.log(name)
        const customer = await prisma.customers.update({
            where: {
                id: id
            },
            data:{
                name:name
            },
        })

        return customer
    }

    async updateCustomerTeams(id:Customers["id"], teamNames:Array<string>): Promise<CustomersUseCaseProps> {

        //Busca o customer com o ID fornecido
        const customer = await prisma.customers.findUnique({
            where: {
                id: id
            }
        })


        //Checa se o team name já existe ou foi enviado duplicado
        if (customer != undefined) {

            const customerTeams = customer?.teams

            teamNames.forEach((name) => {

                customerTeams?.push({
                    id: uuidV4(),
                    name: name
                })
            })

            const isTheTeamDuplicated = await checkDuplicatedCustomerTeam(customerTeams)
        
            if (isTheTeamDuplicated == true) {
                return {errorMessage: '⛔ Team name duplicated ⛔'}
            }


            // Checa se o customer realmente existe e adiciona os teams enviados no array
            const customers = await prisma.customers.update({
                where: {
                    id: id
                },
                data: {
                    teams: customerTeams
                }
            })

        return customers
        } else {
            return {errorMessage: 'Customer not found'}
        }


    }

    async getTeamsIDsToBeDeleted(id:Customers["id"], teamsID: Array<string>) {

        const customer = await prisma.customers.findUnique({
            where: {
                id: id
            }
        })

        const customerTeams = customer?.teams as Customers["teams"]

        let customerTeamsIds:Array<string> = []
        customerTeams.filter( team => {
            if (team.id) {
                customerTeamsIds.push(team.id)
            }
        })

        // Retorna os IDs duplicados (enviados no body vs consultados no customer)
        const duplicatedIDTeams = await getDuplicatedCustomerTeamID(customerTeamsIds, teamsID)
        return duplicatedIDTeams
    }



    
    async deleteCustomerTeams(id:Customers["id"], idsToBeDeleted:Array<string>) {

        const customer = await prisma.customers.findUnique({
            where: {
                id: id
            }
        })
        
        const customerTeams = customer?.teams as Customers["teams"]

        const finalCustomerTeam = await deleteDuplicatedCustomerTeams(customerTeams, idsToBeDeleted)


        try {
            await prisma.customers.update ({
                where: {
                    id: id
                },
                data: {
                    teams:finalCustomerTeam
                },
            })
            
            return {success:true}
        } catch {
            return {errorMessage: "⛔ Error updating customer teams ⛔"}
        }
    }

    
}

export {CustomersRepository}
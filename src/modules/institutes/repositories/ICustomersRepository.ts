import { Customers } from "@prisma/client"

interface CustomersProps extends Array<Customers> {}
interface CustomersUseCaseProps extends Partial<CustomersProps> {
    status?: number
    errorMessage?: string
    success?: boolean
}

interface createCustomerDTO {
    company_id:Customers["company_id"], 
    name:Customers["name"]
}

interface updateCustomerDTO {
    id:Customers["id"],
    name:Customers["name"]
}

interface updateCustomerTeamsDTO {
    id:Customers["id"],
    teams:Customers["teams"]
}



interface ICustomersRepository {
    checkIfCompanyExists(company_id:Customers["company_id"]): Promise<Boolean>
    
    listAllCustomers(): Promise<Customers[]>
    
    customerExists(id:Customers["id"]): Promise<Boolean>
    
    listAllCompanyCustomers(company_id:Customers["company_id"]): Promise<Customers[]>
    
    createCustomer({company_id, name}:createCustomerDTO, teamsNames:Array<string>): Promise<CustomersUseCaseProps>
    
    updateCustomer({id, name}:updateCustomerDTO): Promise<CustomersUseCaseProps>
    
    updateCustomerTeams(id:Customers["id"], teamNames:Array<string>): Promise<CustomersUseCaseProps>
    
    getTeamsIDsToBeDeleted(id:Customers["id"], teamsID:Array<string>): Promise<Array<string>>
    
    deleteCustomerTeams(id:Customers["id"], idsToBeDeleted:Array<string>): Promise<CustomersUseCaseProps>
}

export {ICustomersRepository, createCustomerDTO, updateCustomerDTO, updateCustomerTeamsDTO, CustomersUseCaseProps}
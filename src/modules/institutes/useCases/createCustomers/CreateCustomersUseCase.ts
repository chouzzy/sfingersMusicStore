import { Customers } from "../../entities/Customers";
import { createCustomerDTO, CustomersUseCaseProps, ICustomersRepository } from "../../repositories/ICustomersRepository";
import { checkDuplicatedCustomerTeam, checkIfCustomersNameAlreadyExists } from "./createCustomersCheck";

class CreateCustomersUseCase {
    constructor(
        private customersRepository: ICustomersRepository ) {}

    async execute({company_id, name}: createCustomerDTO, teamsNames:Array<string>): Promise<CustomersUseCaseProps> {

        //Checa se os atributos obrigatórios foram enviados
        if (teamsNames.length <= 0) {
            return {errorMessage:`⛔ You need to put at least one team AND one name to create a Customer⛔`, status:403}
        }

        // Testa se o existe a company existe no banco de dados
        const companyExists = await this.customersRepository.checkIfCompanyExists(company_id)

        if (companyExists === false) {
            return {errorMessage:`⛔ Company doesn't exists ⛔`, status:403}
        }

        // Checa se não existem times repetidos no array
        const isTheTeamDuplicated = await checkDuplicatedCustomerTeam(teamsNames)
        if (isTheTeamDuplicated == true) {
            return {errorMessage:`⛔ Customer has duplicated team names ⛔`, status:403}
        }

        //Checa se o customer já existe
        const allCostumersList = await this.customersRepository.listAllCustomers()

        const customerNameAlreadyExists = await checkIfCustomersNameAlreadyExists(allCostumersList, {company_id, name})
        if (customerNameAlreadyExists == true) {
            return {errorMessage:`⛔ Customer's name already exists in this company ⛔`, status:403}
        }

        //Checa se houve erro na chamada do banco
        const customers = await this.customersRepository.createCustomer({company_id, name}, teamsNames) //criar o id antes
        console.log(customers.errorMessage)
        console.log(typeof(customers.errorMessage))
        if (customers.errorMessage) {
            return {errorMessage:`⛔ Customer's name already exists in this company ⛔`, status:403}
        }

        return customers
    }
}

export {CreateCustomersUseCase}
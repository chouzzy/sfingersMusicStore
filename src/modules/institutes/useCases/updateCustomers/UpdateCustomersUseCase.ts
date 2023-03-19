import { Customers } from "../../entities/Customers";
import { CustomersUseCaseProps, ICustomersRepository } from "../../repositories/ICustomersRepository";
import { checkIfCustomersNameAlreadyExists } from "./updateCustomersCheck";

interface IRequest {
    companyID:Customers["company_id"],
    customerID:Customers["id"]
    name:Customers["name"],
}

class UpdateCustomersUseCase {
    constructor(
        private customersRepository: ICustomersRepository ) {}

    async execute({companyID, customerID, name}: IRequest): Promise<CustomersUseCaseProps> {

        //Checa se os atributos obrigatórios foram enviados
        if (name.length < 3) {
            return {errorMessage:`⛔ You need to put at least one team AND one name to update a Customer⛔`, status:403}
        }


        // Testa se o existe a company existe no banco de dados
        const companyExists = await this.customersRepository.checkIfCompanyExists(companyID)
        if (companyExists === false) {
            return {errorMessage:`⛔ Company doesn't exists ⛔`, status:403}
        }


        //Checa se o customer já existe com esse nome
        const allCostumersList = await this.customersRepository.listAllCustomers()
        const customerNameAlreadyExists = await checkIfCustomersNameAlreadyExists(allCostumersList, {company_id:companyID, name})
        if (customerNameAlreadyExists == true) {
            return {errorMessage:`⛔ Customer's name already exists in this company ⛔`, status:403}
        }

        //Checa se o customer realmente existe
        const customerFound = await this.customersRepository.customerExists(customerID)
        if (customerFound == false) {
            return {errorMessage:`⛔ Customer's not found ⛔`, status:403}
        }

        const customers = await this.customersRepository.updateCustomer({id:customerID, name})

        return customers
    }
}

export {UpdateCustomersUseCase}
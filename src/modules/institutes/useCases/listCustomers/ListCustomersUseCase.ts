import { inject, injectable } from "tsyringe";
import { Customers } from "../../entities/Customers";
import { CustomersUseCaseProps, ICustomersRepository } from "../../repositories/ICustomersRepository";

class ListCustomersUseCase {
    constructor(
        private customersRepository: ICustomersRepository ) {}

    async execute(companyID:Customers["company_id"]): Promise<CustomersUseCaseProps> {

        // Testa se o existe a company existe no banco de dados
        const companyExists = await this.customersRepository.checkIfCompanyExists(companyID)

        if (companyExists === false) {
            return {errorMessage:`⛔ Company doesn't exists ⛔`, status:403}
        }

        const customers = await this.customersRepository.listAllCompanyCustomers(companyID)
        return customers
    }
}

export {ListCustomersUseCase}
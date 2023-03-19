import { Customers } from "../../entities/Customers";
import { CustomersUseCaseProps, ICustomersRepository } from "../../repositories/ICustomersRepository";
import { getDuplicatedCustomerTeamID } from "./deleteCustomerTeamsCheck";

interface IDeleteCustomerTeamUseCase {
    companyID: Customers["company_id"],
    customerID: Customers["id"]
    teamsID: Array<string>
}

class DeleteCustomerTeamsUseCase {
    constructor(
        private customersRepository: ICustomersRepository ) {}

    async execute({companyID, customerID, teamsID}: IDeleteCustomerTeamUseCase): Promise<CustomersUseCaseProps> {

        //Checa se os atributos obrigatórios foram enviados
        if (teamsID.length < 1) {
            return {errorMessage:`⛔ You need to send at least 1 Team ID ⛔`, status:403}
        }


        // Testa se o existe a company existe no banco de dados
        const companyExists = await this.customersRepository.checkIfCompanyExists(companyID)
        if (companyExists === false) {
            return {errorMessage:`⛔ Company doesn't exists ⛔`, status:403}
        }

        //Checa se o customer realmente existe
        const customerFound = await this.customersRepository.customerExists(customerID)
        if (customerFound == false) {
            return {errorMessage:`⛔ Customer's not found ⛔`, status:403}
        }

        //Checa se existe teamID repetido no json enviado
        const duplicatedIDs = await getDuplicatedCustomerTeamID(teamsID)
        if (duplicatedIDs.length > 0 ) {
            return {errorMessage:`⛔ You're requisition body contains duplicated Team IDs ⛔`, status: 403}
        }
        
        //Checa se o teamID já está cadastrado no customer
        const idsToBeDeleted = await this.customersRepository.getTeamsIDsToBeDeleted(customerID, teamsID)
        if (idsToBeDeleted.length == 0) {
            return {errorMessage:`⛔ The teamID doesn't exist in this customer ⛔`, status: 403}
        }

        //Checa se houve erro na chamada do banco
        const updateMessage = await this.customersRepository.deleteCustomerTeams(customerID, idsToBeDeleted)

        return updateMessage
    }
}

export {DeleteCustomerTeamsUseCase}
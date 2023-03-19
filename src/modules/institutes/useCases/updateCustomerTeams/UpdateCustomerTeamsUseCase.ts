import { Customers } from "../../entities/Customers";
import { CustomersUseCaseProps, ICustomersRepository } from "../../repositories/ICustomersRepository";



interface IUpdateCustomerTeamRequest {
    companyID: Customers["company_id"],
    customerID: Customers["id"],
    teamNames: Array<string>
}



class UpdateCustomerTeamsUseCase {

    constructor(
        private customersRepository: ICustomersRepository ) {}

    async execute(
        {companyID, customerID, teamNames}: IUpdateCustomerTeamRequest
        ): Promise<CustomersUseCaseProps> {

            
        //Checa se os atributos obrigatórios foram enviados
        if (teamNames.length <= 0) {
            return {errorMessage:`⛔ You need to send at least one team name ⛔`, status:403}
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

        //Checa se existe teamName repetido - a função está sendo utilizada detro do repositório
        // const isTheTeamDuplicated = await checkDuplicatedCustomerTeam(teamNames)

        //Checa se houve erro na chamada do banco
        const customers = await this.customersRepository.updateCustomerTeams(customerID, teamNames)
        // console.log(customers)
        if (customers.errorMessage != undefined) {
            return {errorMessage:customers.errorMessage, status:403}
        }

        return customers
    }
}

export {UpdateCustomerTeamsUseCase}
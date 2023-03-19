import { Customers } from "../../entities/Customers";
import { createCustomerDTO } from "../../repositories/ICustomersRepository";


//Checa se o customer já existe
async function checkIfCustomersNameAlreadyExists(
    customersList:Customers[], 
    {company_id, name}:createCustomerDTO
    ):Promise<boolean>  {
    
        
    async function checkIfNameAlreadyExists(
        customersList:Customers[], 
        name:string, 
        isDuplicated=false
        ): Promise<boolean> {

            customersList.filter(customer => {
                if (customer.name === name) {
                    if (customer.company_id === company_id) {
                        return isDuplicated = true
                    }
                }
            });
            return isDuplicated
        }
    
    const customerNameAlreadyExists = await checkIfNameAlreadyExists(customersList, name)

    return customerNameAlreadyExists
}

export {checkIfCustomersNameAlreadyExists}
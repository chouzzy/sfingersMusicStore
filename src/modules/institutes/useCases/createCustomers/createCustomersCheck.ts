import { Customers } from "../../entities/Customers"
import { createCustomerDTO } from "../../repositories/ICustomersRepository"




 // Checa se não existem times repetidos no array
 async function checkDuplicatedCustomerTeam(teamsNames:Array<string>){
    
    async function checkDouble(teamsNames:Array<string>): Promise<boolean> {

        let duplicates = teamsNames.filter((item, index) => teamsNames.indexOf(item) !== index)

        if (duplicates.length > 0) { return true } 
        else {return false}
    }
    const isTheTeamDuplicated = await checkDouble(teamsNames)
    return isTheTeamDuplicated
}




//Checa se o customer já existe
async function checkIfCustomersNameAlreadyExists(customersList:Customers[], {company_id, name}:createCustomerDTO): Promise<boolean> {
    
    async function checkIfNameAlreadyExists(customersList:Customers[], {company_id, name}:createCustomerDTO, isDuplicated=false): Promise<boolean>
    {
        // console.log(customersList)
        customersList.filter(customer => {
            if (customer.name === name) {
                if (customer.company_id === company_id) {
                    return isDuplicated = true
                }
            }
        })
        return isDuplicated
    }
    
    const customerNameAlreadyExists = await checkIfNameAlreadyExists(customersList, {company_id, name})

    return customerNameAlreadyExists
}

export {checkDuplicatedCustomerTeam, checkIfCustomersNameAlreadyExists}
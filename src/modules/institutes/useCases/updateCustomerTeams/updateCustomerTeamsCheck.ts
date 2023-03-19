 // Checa se não existem times repetidos no array

import { Prisma } from "@prisma/client"
import { Customers } from "../../entities/Customers"

 
 async function checkDuplicatedCustomerTeam(teams:Customers['teams']){
    
    async function checkDouble(teams:Customers['teams']): Promise<boolean> {
 
        let teamsNames:Array<string> = []

            teams.forEach(team => {
                if (team != null) {
                    teamsNames.push(team.name)
                }
            })

            let duplicates = teamsNames.filter((item, index) => teamsNames.indexOf(item) !== index)

            if (duplicates.length > 0) {
                return true 
            } 

            else {
                return false
            }
        }

    const isTheTeamDuplicated = await checkDouble(teams)
    return isTheTeamDuplicated
}


//Checa se o customer já existe
async function checkIfCustomersNameAlreadyExists(customersList:Array<any>, companyID:string, name:string){
    
    async function checkIfNameAlreadyExists(customersList:Array<any>, name:string, isDuplicated=false): Promise<boolean>
    {
        customersList.filter(customer => {
            if (customer.name === name) {
                if (customer.company_id === companyID) {
                    return isDuplicated = true
                }
            }
        });
        return isDuplicated
    }
    
    const customerNameAlreadyExists = await checkIfNameAlreadyExists(customersList, name)

    return customerNameAlreadyExists
}

export {checkDuplicatedCustomerTeam, checkIfCustomersNameAlreadyExists}
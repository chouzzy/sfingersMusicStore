 // Checa se não existem times repetidos no array

import { Customers } from "../../entities/Customers"

 async function getDuplicatedCustomerTeamID(customerTeamsID: Array<string>, teamsID:Array<string> = []): Promise<Array<string>> {

     
        teamsID.filter( teamID => customerTeamsID.push(teamID))
        
        let duplicates = customerTeamsID.filter((item, index) => customerTeamsID.indexOf(item) !== index)
        
        return duplicates
        
    }

async function deleteDuplicatedCustomerTeams(customersTeams:Customers["teams"], idsToBeDeleted:Array<string>): Promise<Customers["teams"]> {
        idsToBeDeleted.forEach ( (id) => {

            customersTeams = customersTeams.filter( team => {
                return ( team.id != id )
            })

        })

        return customersTeams
}

export {getDuplicatedCustomerTeamID, deleteDuplicatedCustomerTeams}
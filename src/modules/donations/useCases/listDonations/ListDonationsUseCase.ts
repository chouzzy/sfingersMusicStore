import { Donations } from "../../entities/Donations"
import { IDonationsRepository } from "../../repositories/IDonationsRepository"
import { checkQuery } from "./ListDonationsCheck"
import { ListDonationsQuery } from "./ListDonationsController"
//////

class ListDonationsUseCase {
    constructor(
        private donationsRepository: IDonationsRepository) 
        { }
    
    async execute(query:ListDonationsQuery): Promise<Donations[]> {
        
        let {initValue, endValue, email, date, page} = query
        let parseInitValue = Number(initValue)
        let parseEndValue = Number(endValue)
        let actualPage = Number(page)
        

        // Checa se os query params estão corretos
        const isQueryCorrect = await checkQuery(query)
        if ((isQueryCorrect).isValid == false) { return [] }

        
        if (initValue == undefined) { parseInitValue = 0 }
        if (endValue == undefined)  { parseEndValue = 999999999999 }
        if (email == undefined)     { email = "notInformed" }
        if (date == undefined)      { date = "notInformed" }
        if (page == undefined)      { actualPage = 0 }


        const donations = await this.donationsRepository.filterByValueEmailandDate(
            parseInitValue,
            parseEndValue,
            email,
            date,
            actualPage
        )
        // console.log(donations)
        return donations
    }
}

export {ListDonationsUseCase}

import { Prisma } from '@prisma/client';
import * as JSON from 'ts-typed-json';

//

class Customers {

    id!: string
    
    name!: string
    
    company_id!: string

    teams!: Array<{
        id: string,
        name: string
    }>

    createdAt!: Date

    updatedAt!: Date
}

export {Customers}
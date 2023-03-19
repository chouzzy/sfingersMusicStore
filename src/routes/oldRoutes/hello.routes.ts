import { Router } from "express"


const helloRoutes = Router()

helloRoutes.get('/', (req,res) => {   
    return res.send('We did it!')
})

export {helloRoutes}
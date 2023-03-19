import { Router } from "express"


const usersRoutes = Router()

usersRoutes.get('/', (req,res) => {   
    return res.send('Welcome to users, sir. 👨🏻‍✈️')
})

export {usersRoutes}
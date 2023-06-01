import { Router } from "express"
import { clientsRoutes } from "./clients.routes"
// import { clientsRoutes } from "./clients.routes"
// import { transactionsRoutes } from "./transactions.routes"

import { productsRoutes } from "./products.routes "
import { transactionsRoutes } from "./transactions.routes"
import { adminsRoutes } from "./admins.routes"


const router = Router()

//donations routes
// router.use('/transactions', transactionsRoutes)

// products routes
router.use('/products', productsRoutes)

//clients routes
router.use('/clients', clientsRoutes)

//transactions routes
router.use('/transactions', transactionsRoutes)

//admins routes
router.use('/admins', adminsRoutes
)

//users routes

export {router}
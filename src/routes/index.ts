import { Router } from "express"
import { adminsRoutes } from "./admins.routes"
import { donationsRoutes } from "./donations.routes"

import { studentsRoutes } from "./students.routes "


const router = Router()

//donations routes
router.use('/donates', donationsRoutes)

// students routes
router.use('/students', studentsRoutes)

//regristrations routes
router.use('/admins', adminsRoutes)

//users routes

export {router}
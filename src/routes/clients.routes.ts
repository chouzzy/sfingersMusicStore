import { Router } from "express"
import { CreateClientsController } from "../modules/store/useCases/clients/createClients/CreateClientsController"
import { DeleteClientController } from "../modules/store/useCases/clients/deleteClient/DeleteClientController"
import { ListClientsController } from "../modules/store/useCases/clients/listClients/ListClientsController"
import { UpdateClientsController } from "../modules/store/useCases/clients/updateClients/UpdateClientController"

const clientsRoutes = Router()

const listClientsController = new ListClientsController()
clientsRoutes.get('/', listClientsController.handle)

const createClientsController = new CreateClientsController()
clientsRoutes.post('/create', createClientsController.handle)

const updateClientsController = new UpdateClientsController()
clientsRoutes.put('/:clientID/update', updateClientsController.handle)

const deleteClientsController = new DeleteClientController()
clientsRoutes.delete('/:clientID/delete', deleteClientsController.handle)


export {clientsRoutes}
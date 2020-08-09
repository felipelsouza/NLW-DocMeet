import express from 'express'
import AppointmentsController from './controllers/AppointmentsController'
import ConnectionsController from './controllers/ConnectionsController'

const routes = express.Router()
const appointmentsController = new AppointmentsController()
const connectionsController = new ConnectionsController()

routes.get('/appointments', appointmentsController.index)
routes.post('/appointments', appointmentsController.create)

routes.post('/connections', connectionsController.create)
routes.get('/connections', connectionsController.index)

export default routes
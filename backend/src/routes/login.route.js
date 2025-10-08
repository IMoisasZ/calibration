import { Router } from 'express'
import LoginController from '../controllers/login.controller.js'
import { loginValidator } from '../middlewares/login.middleware.js'

const route = Router()

route.post('/', loginValidator, LoginController.login)

export default route

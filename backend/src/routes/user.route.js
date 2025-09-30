import { Router } from 'express'
import UserController from '../controllers/user.controller.js'
import {
	createUserValidator,
	updateUserValidator,
	getAllUsersValidator,
	getUserValidator,
	patchUserDisableEnableValidator,
} from '../middlewares/user.middleware.js'

const route = Router()

route.post('/', createUserValidator, UserController.createUser)
route.put('/:id', updateUserValidator, UserController.updateUser)
route.get('/', getAllUsersValidator, UserController.getAllUsers)
route.get('/:id', getUserValidator, UserController.getUser)
route.patch(
	'/:id',
	patchUserDisableEnableValidator,
	UserController.patchUserDisableEnable
)

export default route

import { Router } from 'express'
import UnityController from '../controllers/unity.controller.js'
import {
	createUnityValidator,
	updateUnityValidator,
	getAllUnityValidator,
	getUnityValidator,
	updateUnityStatusValidator,
} from '../middlewares/unity.middleware.js'

const route = Router()

route.post('/', createUnityValidator, UnityController.createUnity)
route.put('/:id', updateUnityValidator, UnityController.updateUnity)
route.get('/', getAllUnityValidator, UnityController.getAllUnity)
route.get('/:id', getUnityValidator, UnityController.getUnity)
route.patch(
	'/:id',
	updateUnityStatusValidator,
	UnityController.updateUnityStatus
)

export default route

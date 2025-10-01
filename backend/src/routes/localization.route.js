/** @format */

import { Router } from 'express'
import LocalizationController from '../controllers/localization.controller.js'
import {
	createLocalizationValidate,
	updateLocalizationValidate,
	getAllLocalizationValidator,
	getLocalizationValidate,
	updateLocalizationStatusValidate,
} from '../middlewares/localization.middleware.js'

const route = Router()

route.post(
	'/',
	createLocalizationValidate,
	LocalizationController.createLocalization
)
route.put(
	'/:id',
	updateLocalizationValidate,
	LocalizationController.updateLocalization
)
route.get(
	'/',
	getAllLocalizationValidator,
	LocalizationController.getAllLocalization
)
route.get(
	'/:id',
	getLocalizationValidate,
	LocalizationController.getLocalization
)
route.patch(
	'/:id',
	updateLocalizationStatusValidate,
	LocalizationController.updateLocalizationStatus
)

export default route
